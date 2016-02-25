var express = require('express');
var router = express.Router();
var resJson = require('../config/response');
var information = require('../dbModel/information');


/* POST login. */
router.post('/query', function (req, res, next) {
    information.find({}).exec(function(err,result){
        if(result){
            resJson.code = 200;
            resJson.mes='网站信息获取成功';
            resJson.data = result[0];
        }else{
            resJson.code = 201;
            resJson.mes = '获取网站信息错误!';
        }
        res.json(resJson);
    });
});
router.post('/set', function (req, res, next) {
    information.find({}).exec(function(err,result){
        //判断是否有初始化数据
        if(result.length>0){
            var conditions = { _id: result[0]['_id'] },
                update = req.body,
                options = { multi: true };
            information.update(conditions, update, options, function(err){
                if(!err){
                    resJson.code = 200;
                    resJson.mes='网站信息更新成功';
                }else{
                    resJson.code = 201;
                    resJson.mes='网站信息更新失败';
                }
            })

        }else{
            information.create(req.body,function(err,result){
                if(err){
                    resJson.mes = '添加错误';
                    resJson.code = 201;
                }else{
                    resJson.code = 200;
                    resJson.data = result;
                    resJson.mes = '添加成功';
                }
            })
        }
        res.json(resJson);
    });
});
module.exports = router;
