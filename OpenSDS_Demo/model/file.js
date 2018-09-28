let Model = require('../shared/model');

let file = new Model({
  name: 'file',
  schema: {
    id: '',
    name: 'file01.jpg',
    size: '10',
    last_modified: '2018-02-25 07:30:12',
    bucket_id: "3E957kgA4lvwjmWU"
  }
});

module.exports = file;