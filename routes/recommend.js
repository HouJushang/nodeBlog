var express = require('express');
var router = express.Router();
var recommend = require('../dbModel/recommend');
var resJson = require('../config/response');

router.post('/', function (req, res, next) {
    recommend.find({}).exec(function (err, result) {
        if (result) {
            resJson.mes = '推荐位列表';
            resJson.code = 200;
            resJson.data = result;
        } else {
            resJson.mes = '没有推荐位';
            resJson.code = 201;
        }
        res.json(resJson);
    })
})
router.post('/add', function (req, res, next) {
    recommend.findOne({
        name: req.body.name
    }).exec(function (err, result) {
        if (result) {
            resJson.mes = '推荐位存在';
            resJson.code = 201;
        } else {
            recommend.create(req.body, function (err, result) {
                if (err) {
                    resJson.mes = '添加错误';
                    resJson.code = 201;
                } else {
                    resJson.code = 200;
                    resJson.data = result;
                    resJson.mes = '添加成功';
                }
            })
        }
        res.json(resJson);
    })
});
router.post('/del', function (req, res, next) {
    recommend(req.body).remove(function (err, result) {
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
