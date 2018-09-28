module.exports = function (router) {

    router.get('/v1beta/users/:userId/projects', async (req, res) => {
        let model = models.projects;
        let rs = await model.find(req.query);

        res.send(rs[0]);
    });

    router.restful(models.projects, '/v1beta/users/:userId/');
}