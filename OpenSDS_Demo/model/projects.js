let Model = require('../shared/model');

let projects = new Model({
    name: 'projects',
    schema: {
        "projects": [
            {
                "id": "623457885666",
                "name": "project01"
            }
        ]
    }
});

module.exports = projects;