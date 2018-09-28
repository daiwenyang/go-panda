module.exports = function(router){
  
  router.restful(models.cabinet, '/resource/');

  router.restful(models.application, '/resource/');
  
  router.get('/resource/application/summary', (req, res)=>{
    res.send( models.application.summary(req.query.cabinetId) );
  })
  
  router.get('/resource/application/:id/process', (req, res)=>{
  })

  router.get('/resource/vcenter?cabinetId', (req, res)=>{
    
  })

  router.get('/resource/vcenter/cluster?vcenterid', (req, res)=>{
    
  })

  router.get('/resource/vcenter/cluster/esx?clusterid', (req, res)=>{
    
  })

  router.get('/resource/vcenter/cluster/esx/vm?esxId', (req, res)=>{
    
  })

}