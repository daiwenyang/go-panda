let Model = require('../shared/model');

let migration = new Model({
  name: 'migration',
  schema: {
    id: "",
    name: "migration_01",
    status: "reading",
    srcBucket: "bucket01",
    destBucket: "bucket02",
    excutingTime: 1537963670699,
    endTime: "",
    rule: "",
    configDataAnalysis: false,
    analysisCluster: "",
    ak: "",
    sk: "",
    deleteSrcObject: false
  }
});

module.exports = migration;