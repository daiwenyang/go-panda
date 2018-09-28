let Model = require('../shared/model');

let type = new Model({
    name: 'type',
    schema: {
        id: 'aws',
        name: 'aws'
    }
});

module.exports = type;