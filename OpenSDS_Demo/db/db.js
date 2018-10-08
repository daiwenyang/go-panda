let fs = require('fs');
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
    console.log('init data success');
  })
}