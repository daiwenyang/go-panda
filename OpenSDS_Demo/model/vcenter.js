let Model = require('../shared/model');

let application = new Model({
  name: 'application',
  schema: {
    name: 'application',
    cabinetId: 'cabinetId'
  },
  summary: function(cabinetId){
   
  }
});

module.exports = application;