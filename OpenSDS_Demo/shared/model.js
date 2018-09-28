class Model {
  constructor(config){
    return Object.assign(this, config);
  }
  
  //增
  async insert(body = {}){
    Object.keys(this.schema).map(key => {
      if( !body.hasOwnProperty(key) ){
        body[key] = this.schema[key];
      }
    })

    let r = await this.db.insert.apply(this.db, arguments);
    
    console.log(`创建${this.name}成功`);
    console.log(arguments);
    
    return r;
  }

  //删
  async remove(){
    let r = await this.db.remove.apply(this.db, arguments);
    
    console.log(`删除${this.name}成功`);
    console.log(arguments);

    return r;
  }

  //改
  async update(){
    let r = await this.db.update.apply(this.db, arguments);
    
    console.log(`修改${this.name}成功`);
    console.log(arguments);
    
    return r;
  }

  //查-列表
  async find(query = {}){
    let limit = query.limit;
    let page = query.page;

    delete query.limit;
    delete query.page;

    Object.keys(query).map(key => {
      query[key] = new RegExp(query[key], 'i');
    });

    if( limit && page ){
      let r = await this.db.find.apply(this.db, arguments);
      r = r.slice((page-1)*limit, page*limit);

      console.log(`查询${this.name}成功`);
      console.log(r);

      return r;
    }
    else{
      let r = await this.db.find.apply(this.db, arguments);
      
      console.log(`查询${this.name}成功`);
      console.log(r);
      
      return r;
    }
  }

  //查-单个
  async findOne(){
    let r = await this.db.findOne.apply(this.db, arguments); 
    
    console.log(`查询${this.name}详情成功`);
    console.log(r);
    
    return r;
  }

  //查-个数
  async count(query = {}){
    delete query.limit;
    delete query.page;

    Object.keys(query).map(key => {
      query[key] = new RegExp(query[key], 'i');
    });
    
    let r = await this.db.count.apply(this.db, arguments); 

    console.log(`查询${this.name}个数成功`);
    console.log(r);

    return r;
  }
}

module.exports = Model;