module.exports = function(router){

  router.get('/v1beta/:project_id/availabilityZones', async (req, res) => {
    let model = models.availabilityZones;
    let rs = await model.find(req.query);
    let response = [];
    rs.forEach(element => {
      response.push(element.name);
    });

    res.send(response);
  });

  router.restful(models.availabilityZones, '/v1beta/:projectId/');
}