let Model = require('../shared/model');

let volumes = new Model({
  name: 'volumes',
  schema: {
    id: '',
    name: 'volumes01',
    status: 'available',
    size: 1,
    availabilityZone: 'Zone',
    createdAt: '',
    poolId: '',
    profileId: '',
    snapshotId: '',
    updatedAt: '',
    userId: '',
    replicaitonId: '123'
  }
});

module.exports = volumes;