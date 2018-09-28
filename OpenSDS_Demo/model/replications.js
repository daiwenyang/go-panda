let Model = require('../shared/model');

let replications = new Model({
  name: 'replications',
  schema: {
    availabilityZone: "secondary",
    createdAt: "2018-09-26T18:39:56",
    id: "195f9922-e161-4daf-b74b-f6899409afc9",
    name: "volume_01-replication",
    primaryVolumeId: "a24be28e-b571-4e88-8ec9-22f2e707df5c",
    profileId: "d8d303fe-392a-4e26-a67c-c17ca9771094",
    replicationMode: "async",
    replicationPeriod: 60,
    replicationStatus: "creating",
    secondaryVolumeId: "e39abe9d-2401-4d77-b8e0-e7880256af99",
    tenantId: "6095930ff86e4312b5b48d272f66f0c7",
    updatedAt: ""
  }
});

module.exports = replications;