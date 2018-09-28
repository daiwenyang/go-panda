let Model = require('../shared/model');

let snapshots = new Model({
    name: 'snapshots',
    schema: {
        "id": "85e1071e-3d27-4c9c-b601-eec1ff4eacaa",
        "createdAt": "2018-09-27T14:12:37",
        "updatedAt": "2018-09-27T14:12:37",
        "name": "123",
        "size": 3,
        "status": "available",
        "volumeId": "de84dbe8-26fb-4c72-9960-3450f3744333"
    }
});

module.exports = snapshots;