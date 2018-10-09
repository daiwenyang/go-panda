let fs = require('fs');
let fse = require('fs-extra');
let path = require('path');
let datastore = require('nedb-promise');

reset();

//重置数据
function reset(){
  let initdir = path.join(__dirname, '/init');
  let datadir = path.join(__dirname, '/data');

  Promise.all(
    fs.readdirSync(initdir).map((filename) => {
      return new Promise(async (resolve, reject)=>{
        //清空数据
        let db = new datastore({filename: datadir + '/' + filename.slice(0, -3) + ".nedb", autoload: true});
        await db.remove({}, {multi: true});

        //插入数据
        let initdata = require(initdir + '/' + filename.slice(0, -3));
        await db.insert(initdata);

        resolve();
      })
    })
  ).then(()=>{
    let presetFiles = "detail_record_2017_01_02_08_00_00,detail_record_2017_01_03_08_00_00,detail_record_2017_01_04_08_00_00,detail_record_2017_01_05_08_00_00,detail_record_2017_01_06_08_00_00,driver_behavior.jar,open_case.jpg,result.xlsx";
    let fileNames = findSync('uploads/');
    fileNames.forEach(item => {
      if(presetFiles.indexOf(item)==-1){
        fse.removeSync("uploads/"+ item);
      }
    })

    // console.log('Clear data success!');
  })
}

function findSync(startPath){
  let result=[];
  function finder(_path){
    let files = fs.readdirSync(_path);
    files.forEach((val, index)=> {
      let fPath = path.join(_path, val);
      let stats = fs.statSync(fPath);
      if(stats.isDirectory()) finder(fPath);
      if(stats.isFile()) result.push(val);
    })
  }
  finder(startPath);
  return result;
}