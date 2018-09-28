let Model = require('../shared/model');

let profiles = new Model({
  name: 'profiles',
  schema: {
    "id": "",
    "name": "profile_01",
    "description": "",
    "extras": {
      ":provisionPolicy": {
        "ioConnectivityLoS": {
          "accessProtocol": "iSCSI"
        },
        "dataStorageLoS": {
          "provisioningPolicy": "Thin"
        }
      }
    },
    "updatedAt": ""
  }
});

module.exports = profiles;