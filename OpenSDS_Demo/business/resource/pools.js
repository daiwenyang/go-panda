module.exports = function(router){  
    router.restful(models.pools, '/v1beta/:projectId/');
  }