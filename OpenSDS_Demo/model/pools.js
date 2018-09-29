let Model = require('../shared/model');

let pools = new Model({
  name: 'pools',
  schema: {
    "name": "",
    "freeCapacity": "",
    "totalCapacity": "",
    "extras": {
        "advanced": {
            "diskType": "SSD/RAID5"
        },
        "backend": ""
    }
  }
});

module.exports = pools;