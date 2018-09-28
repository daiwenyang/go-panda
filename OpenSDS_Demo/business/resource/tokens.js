module.exports = function (router) {
    router.restful(models.tokens, '/v1beta/auth/');
}