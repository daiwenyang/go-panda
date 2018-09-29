module.exports = function (router) {
    router.restful(models.type, '/v1beta/:projectId/');
}