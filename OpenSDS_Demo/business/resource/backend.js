module.exports = function (router) {

    router.post('/v1beta/:projectId/backend', async (req, res) => {
        let model = models.backend;
        let rs = await model.insert(req.body);
        req.body.id = rs._id;
        await model.update({ _id: rs._id }, { $set: req.body });
        let response = await model.findOne({ _id: rs._id });
        res.send(response);
    });

    router.restful(models.backend, '/v1beta/:projectId/');

}