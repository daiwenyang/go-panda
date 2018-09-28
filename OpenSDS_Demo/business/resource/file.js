let multer = require('multer');
const fs = require('fs');
module.exports = function (router) {

  var upload = multer({ dest: 'upload/' }).any();

  router.post('/v1beta/:projectId/file', async (req, res) => {
    let model = models.file;
    let rs = await model.insert(req.body);
    req.body.id = rs._id;
    await model.update({ _id: rs._id }, { $set: req.body });
    let response = await model.findOne({ _id: rs._id });
    res.send(response);
  });

  // 上传
  router.post('/v1beta/file/upload', async (req, res) => {
    res.send({});
    upload(req, res, async function (err) {
      //添加错误处理
      if (err) {
        console.log(err);
        return;
      }
      req.file = req.files[0];
      var tmp_path = req.file.path;
      console.log(tmp_path);
      // save file name
      let model = models.file;
      let newFile = {
        id: '',
        name: req.file.originalname,
        size: req.file.size,
        last_modified: '',
        bucket_id: req.query.bucket_id
      }
      let rs = await model.insert(newFile);
      newFile.id = rs._id;
      await model.update({ _id: rs._id }, { $set: newFile });

      /** The original name of the uploaded file
          stored in the variable "originalname". **/
      var target_path = 'uploads/' + req.file.originalname;

      /** A better way to copy the uploaded file. **/
      console.log(target_path);


      if (!fs.existsSync('uploads/')) {
        fs.mkdirSync('uploads/');
      }

      var src = fs.createReadStream(tmp_path);
      var dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on('end', function () {
        res.end();
      });
      src.on('error', function (err) {

        res.end();
        console.log(err);
      });

    });

  });

  // 下载
  router.get('/v1beta/:project_id/file/download', function (req, res) {
    console.log("---------访问下载路径-------------");
    var pathname = req.query.file_name;
    var realPath = "uploads/" + pathname;
    fs.exists(realPath, function (exists) {
      if (!exists) {
        console.log("文件不存在");
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });

        res.write("This request URL " + pathname + " was not found on this server.");
        res.end();
      } else {
        console.log("文件存在");
        fs.readFile(realPath, "binary", function (err, file) {
          if (err) {
            res.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            console.log("读取文件错误");
            res.end(err);
          } else {
            res.writeHead(200, {
              "Content-type":"application/force-download",
              "Content-Disposition":"attachment;filename="+encodeURI(req.query.file_name)
            });
            console.log("读取文件完毕，正在发送......");

            res.write(file, "binary");

            res.end();
            console.log("文件发送完毕");
          }
        });
      }
    });
  });


  router.restful(models.file, '/v1beta/:projectId/');

}