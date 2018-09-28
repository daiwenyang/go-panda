/* 标准restful风格请求和对应模型方法的绑定 */

module.exports = function(model, url_prefix = '/'){
  let router = this;

  //增
  router.post(`${url_prefix}${model.name}`, async (req, res) => {
    let r = await model.insert(req.body);

    res.send(r);
  });

  //删
  router.delete(`${url_prefix}${model.name}/:id`, async (req, res) => {
    let r = await model.remove({_id: req.params.id});

    res.send({});
  });

  //改
  router.put(`${url_prefix}${model.name}/:id`, async (req, res) => {
    let r = await model.update({_id: req.params.id}, {$set: req.body});

    res.send({});
  });

  //查-列表
  router.get(`${url_prefix}${model.name}`, async (req, res) => {
    let r = await model.find(req.query);

    res.send(r);
  });

  //查-个数
  router.get(`${url_prefix}${model.name}/count`, async (req, res) => {
    let r = await model.count(req.query)
    
    res.send({count: r});    
  });

  //查-单个
  router.get(`${url_prefix}${model.name}/:id`, async (req, res) => {
    let r = await model.findOne({_id: req.params.id});

    res.send(r);
  });
}