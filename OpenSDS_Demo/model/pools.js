let Model = require('../shared/model');

let pools = new Model({
  name: 'pools',
  schema: {
    "name": "",
    "freeCapacity": 0,
    "totalCapacity": 0,
    "extras": {
        "advanced": {
            "diskType": "SSD/RAID5"
        },
        "backend": ""
    }
  }
});

module.exports = pools;