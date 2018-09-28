module.exports = function(router){
  
  router.post('/v1beta/:projectId/bucket', async (req, res) => {
    let model = models.bucket;
    req.body.createdAt = new Date();
    let rs = await model.insert(req.body);
    req.body.id = rs._id;
    await model.update({ _id: rs._id }, { $set: req.body });
    let response = await model.findOne({ _id: rs._id });
    res.send(response);
  });

  router.restful(models.bucket, '/v1beta/:projectId/');

  // router.get('/v1beta/:projectId/profiles', (req, res)=>{
  //   res.send({"a":"b"});
  // });

  // router.post(`/v1beta/:projectId/volume`, async (req, res) => {
  //   let model = models.volume;
  //   let rs = await Promise.all( req.body.volumes.map(e => model.insert(e)) );

  //   res.send(rs);
  // });

  // router.get(`/v1beta/:projectId/volume`, async (req, res) => {

  //   let rs = await Promise.all( req.body.volumes.map(e => model.insert(e)) );

  //   res.send(rs);
  // });

  // router.get(`/v1beta/:projectId/volume/id`, async (req, res) => {

  //   let rs = await Promise.all( req.body.volumes.map(e => model.insert(e)) );

  //   res.send(rs);
  // });

  // router.put(`/v1beta/:projectId/volume/id`, async (req, res) => {

  //   let rs = await Promise.all( req.body.volumes.map(e => model.insert(e)) );

  //   res.send(rs);
  // });
}