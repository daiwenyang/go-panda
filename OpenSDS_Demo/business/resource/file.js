const fs = require('fs'); 
let fse = require('fs-extra');                                                                                               
const multiparty = require('multiparty');

module.exports = function (router) {

  router.post('/v1beta/:projectId/file', async (req, res) => {
    let model = models.file;
    let rs = await model.insert(req.body);
    req.body.id = rs._id;
    await model.update({ _id: rs._id }, { $set: req.body });
    let response = await model.findOne({ _id: rs._id });
    res.send(response);
  });

  router.delete('/v1beta/:projectId/file/:id', async (req, res) => {
    let model = models.file;
    let presetFiles = "detail_record_2017_01_02_08_00_00,detail_record_2017_01_03_08_00_00,detail_record_2017_01_04_08_00_00,detail_record_2017_01_05_08_00_00,detail_record_2017_01_06_08_00_00,driver_behavior.jar,open_case.jpg,result.xlsx";
    let file = await model.findOne({_id: req.params.id});
    await model.remove({_id: req.params.id});

    if(presetFiles.indexOf(file.name)==-1){
      await fse.removeSync("uploads/"+ file.name);
    }

    res.send({});
  });

  //上传后更新数据库
  router.post('/v1beta/file/updatedb', async (req, res) => {
      let model = models.file;
      let date = new Date();
      let newFile = {
        id: '',
        name: req.body.name,
        size: req.body.size,
        last_modified: date,
        bucket_id: req.body.bucketID,
        location: req.body.backendName
      }
      let rs = await model.insert(newFile);
      newFile.id = rs._id;
      await model.update({ _id: rs._id }, { $set: newFile });
      
      res.send();
  });

  // 上传
  router.post('/v1beta/file/upload', async (req, res) => {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './uploads'});
    form.parse(req, function(err, fields, files){
        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var dstPath = 'uploads\\' + inputFile.originalFilename;

        if (fs.existsSync(dstPath)) {
          res.send({isExsit: true});
        }else{
          fs.rename(uploadedPath, dstPath, function(err) {
              if(err){
                  console.log('rename error: ' + err);
              } else {
                  console.log('rename ok');
              }
          });
          files.file[0].path = dstPath;
          var data = files.file[0];
          
          res.send(data);
        }
    });

    // res.send({});
    // upload(req, res, async function (err) {
    //   //添加错误处理
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   req.file = req.files[0];
    //   var tmp_path = req.file.path;
    //   console.log(tmp_path);
    //   // save file name
    //   let model = models.file;
    //   let newFile = {
    //     id: '',
    //     name: req.file.originalname,
    //     size: req.file.size,
    //     last_modified: '',
    //     bucket_id: req.query.bucket_id
    //   }
    //   let rs = await model.insert(newFile);
    //   newFile.id = rs._id;
    //   await model.update({ _id: rs._id }, { $set: newFile });

    //   /** The original name of the uploaded file
    //       stored in the variable "originalname". **/
    //   var target_path = 'uploads/' + req.file.originalname;

    //   /** A better way to copy the uploaded file. **/
    //   console.log(target_path);


    //   if (!fs.existsSync('uploads/')) {
    //     fs.mkdirSync('uploads/');
    //   }

    //   var src = fs.createReadStream(tmp_path);
    //   var dest = fs.createWriteStream(target_path);
    //   src.pipe(dest);
    //   src.on('end', function () {
    //     res.end();
    //   });
    //   src.on('error', function (err) {

    //     res.end();
    //     console.log(err);
    //   });

    // });

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
