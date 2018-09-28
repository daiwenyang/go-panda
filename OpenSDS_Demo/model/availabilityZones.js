let Model = require('../shared/model');

let availabilityZones = new Model({
  name: 'availabilityZones',
  schema: {
    id: '',
    name: 'az1.dc1'
  }
});

module.exports = availabilityZones;