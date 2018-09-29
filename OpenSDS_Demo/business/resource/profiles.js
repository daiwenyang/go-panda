module.exports = function(router){

  router.post('/v1beta/:projectId/profiles', async (req, res) => {
    let model = models.profiles;
    let rs = await model.insert(req.body);
    req.body.id = rs._id;
    await model.update({ _id: rs._id }, { $set: req.body });
    let response = await model.findOne({ _id: rs._id });
    res.send(response);
  });
  
  router.restful(models.profiles, '/v1beta/:projectId/');
}