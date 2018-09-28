let Model = require('../shared/model');

let tokens = new Model({
  name: 'tokens',
  schema: {
    "token": {
      "expires_at": "Fri Sep 28 2018 11:47:31 GMT+0800 (GMT+08:00)",
      "issued_at": "Fri Sep 28 2019 11:47:31 GMT+0800 (GMT+08:00)",
      "user": {
        "id" : "123456"
      }
    }
  }
});

module.exports = tokens;