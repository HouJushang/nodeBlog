var express = require('express');
var router = express.Router();
var resJson = require('../config/response');
var friendModel = require('../dbModel/friend');


/* POST login. */
router.post('/query', function (req, res, next) {
    friendModel.find({}).exec(function (err, result) {
        if (result) {
            resJson.code = 200;
            resJson.mes = '网站信息获取成功';
            resJson.data = result;
        } else {
            resJson.code = 201;
            resJson.mes = '获取网站信息错误!';
        }
        res.json(resJson);
    });
});
router.post('/add', function (req, res, next) {
    friendModel.create(req.body, function (err, result) {
        if (err) {
            resJson.mes = '添加错误';
            resJson.code = 201;
        } else {
            resJson.code = 200;
            resJson.data = result;
            resJson.mes = '添加成功';
        }
        res.json(resJson);
    })
});
router.post('/del',function(req, res, next){
    friendModel(req.body).remove(function (err, result) {
        if (result) {
            resJson.mes = '删除成功';
            resJson.data = result;
            resJson.code = 200;
        } else {
            resJson.mes = '删除失败';
            resJson.code = 201;
        }
        res.json(resJson);
    })
});
module.exports = router;
