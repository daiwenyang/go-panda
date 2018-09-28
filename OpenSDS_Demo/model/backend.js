let Model = require('../shared/model');

let backend = new Model({
    name: 'backend',
    schema: {
        "id": "",
        "name": "default",
        "type": "1",
        "region": "", 
        "endpoint": "",
        "bucket": "bucket01",
        "accessKey": "",
        "secretKey": ""
    }
});

module.exports = backend;