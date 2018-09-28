let Model = require('../shared/model');

let user = new Model({
  name: 'user',
  schema: {
    confirmPassword: null,
    createDate: null,
    editeFlag: "1",
    email: "",
    lastUpdateDate: null,
    lockFlag: "0",
    oldPassword: null,
    password: null,
    result: {},
    roleId: null,
    roleName: "sysadmin",
    roleType: "0",
    salt: null,
    telephone: "",
    userId: "599456b0a6b14a6d8b65d5055cb7c05f",
    userName: "make123",
    userNameCN: null
  },
  //禁用用户
  disable: async function(){
    let r = await this.find({});
    console.log(r);
  }
});

module.exports = user;