const fs = require('fs');
module.exports = function (router) {

    router.post('/v1beta/:projectId/migration', async (req, res) => {
        let model = models.migration;
        let rs = await model.insert(req.body);
        req.body.id = rs._id;
        await model.update({ _id: rs._id }, { $set: req.body });
        let response = await model.findOne({ _id: rs._id });
        res.send(response);
        let currentTime = new Date().getTime();
        setTimeout(async function() {
            console.log("延迟" + (parseInt(req.body.excutingTime) - currentTime) + "毫秒后执行迁移任务");
            let startTime = new Date().getTime();
            req.body.status = "migrating";
            if(req.body.jar){
                req.body.ana_status = "waiting";
            }else{
                req.body.ana_status = "Not configured";
            }
            
            model.update({ _id: rs._id }, { $set: req.body });
            // 复制文件到新桶
            let fileModel = models.file;
            let bucketModel = models.bucket;
            let srcBucket = await bucketModel.findOne({name: req.body.srcBucket});
            let destBucket = await bucketModel.findOne({name: req.body.destBucket});
            let allFileSrcBucket = await fileModel.find({bucket_id: srcBucket.id });
            allFileSrcBucket.forEach(async (srcFile) => {
                if(srcFile.name !== "driver_behavior.jar"){
                    srcFile.bucket_id = destBucket.id;
                    await fileModel.update({ _id: srcFile._id }, { $set: srcFile });
                }
            });
            // 删除源桶
            if (req.body.deleteSrcObject) {
                await bucketModel.remove({_id: srcBucket.id});
            }
            let endTime = new Date().getTime();
            setTimeout(async function() {
                console.log((endTime - startTime) + "毫秒后执行完成, 更新迁移任务状态和结束时间");
                req.body.status = "completed";
                if(req.body.jar){
                    req.body.ana_status = "completed";
                    let model = models.file;
                    let newFile = {
                        id: '',
                        name: 'result.xlsx',
                        size: '10240',
                        last_modified: '',
                        bucket_id: srcBucket.id,
                        location: ""
                    }
                    let rs = await model.insert(newFile);
                    newFile.id = rs._id;
                    await model.update({ _id: rs._id }, { $set: newFile });
                }else{
                    req.body.ana_status = "Not configured";
                }
                req.body.endTime = new Date().getTime();
                model.update({ _id: rs._id }, { $set: req.body });
            }, 30000);
        }, parseInt(req.body.excutingTime) - currentTime);
    });

    router.restful(models.migration, '/v1beta/:projectId/');

}