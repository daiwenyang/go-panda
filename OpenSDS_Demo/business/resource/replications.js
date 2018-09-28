module.exports = function (router) {

    router.post('/v1beta/:projectId/block/replications', async (req, res) => {
        let model = models.replications;
        req.body.createdAt = new Date();
        let rs = await model.insert(req.body);
        req.body.id = rs._id;
        await model.update({ _id: rs._id }, { $set: req.body });
        let response = await model.findOne({ _id: rs._id });
        res.send(response);
    });

    router.get('/v1beta/:projectId/block/replications/detail', async (req, res) => {
        let model = models.replications;
        let rs = await model.find(req.query);
        res.send(rs);
    });

    router.restful(models.replications, '/v1beta/:projectId/block/');

}