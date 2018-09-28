let Model = require('../shared/model');

let bucket = new Model({
  name: 'bucket',
  schema: {
    id: '',
    name: 'bucket01',
    backend: 'backend',
    createdAt: '2018-02-25 07:30:12'
  }
});

module.exports = bucket;