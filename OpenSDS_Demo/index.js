let fs = require('fs');
let datastore = require('nedb-promise');
let express = require('express');
let bodyParser = require('body-parser');
let restful = require('./shared/restful');
let CONFIG = JSON.parse( fs.readFileSync("./config.json", "utf8") );

createApp();

//创建app
function createApp(){
  let app = express();
  let router = express.Router();

  //扩展标准restful方法
  router.restful = restful;

  //发布模型到全局
  global.models = initModel();
  loadModules(router);

  app.use(bodyParser.json());
  app.use(router);
  app.use(express.static("webapp"));
  app.listen(CONFIG.port);

  console.log(`app listening on: http://127.0.0.1:${CONFIG.port}`);
}

//初始化模型
function initModel(){
  return fs.readdirSync('./model').reduce((models, file) => {
    let name = file.slice(0, -3);
    
    models[name] = require(`./model/${name}`);
    
    //统一绑定模型和数据库
    models[name].db = new datastore({
      filename: `./db/data/${name}.nedb`,
      autoload: true
    });

    console.log(`init model: ${name}`);

    return models;
  }, {});
}

//加载业务模块
function loadModules(router){
  readdir('./business');  

  function readdir(path) {
    fs.readdirSync(path).map((file) => {
      let filePath = `${path}/${file}`;
      
      if( fs.lstatSync(filePath).isDirectory() ){
        readdir(filePath);
      }
      else{
        require(`${path}/${file.slice(0, -3)}`)(router);
        console.log(`load module: ${filePath}`);
      }
    })
  }
}