let Model = require('../shared/model');

let cabinet = new Model({
  name: 'cabinet',
  schema: {
    name: 'cabinet',
    type: '1|2|3',
    ldrId: 'ldrId'
  },
});

module.exports = cabinet;