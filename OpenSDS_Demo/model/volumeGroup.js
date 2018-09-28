let Model = require('../shared/model');

let volumeGroup = new Model({
    name: 'volumeGroup',
    schema: {
        "id": "24545673-1488-4178-b481-d45e7fba6962",
        "createdAt": "2018-09-26T19:19:10",
        "updatedAt": "", 
        "name": "group01",
        "status": "available",
        "tenantId": "6095930ff86e4312b5b48d272f66f0c7",
        "userId": "265ae38cf0424c0f820f9b9bbb98e9b4",
        "profiles": ["d8d303fe-392a-4e26-a67c-c17ca9771094"],
        "availabilityZone": "default",
        "poolId": "a6a0d19a-b666-5de3-b910-2faeeee1c4d4"
    }
});

module.exports = volumeGroup;