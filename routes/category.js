/**
 * Created by Laggo on 16/1/28.
 */
var express = require('express');
var router = express.Router();
var category = require('../dbModel/category')
var resJson = require('../config/response');

/* category. */
router.post('/', function (req, res, next) {
    category.find({}).exec(function (err, result) {
        if (result) {
            resJson.mes = '栏目列表';
            resJson.code = 200;
            resJson.data = result;
        } else {
            resJson.mes = '没有栏目';
            resJson.code = 201;
        }
        res.json(resJson);
    })
});
router.post('/add', function (req, res, next) {
    category.findOne(req.body).exec(function (err, result) {
        if (result) {
            resJson.mes = '栏目已经存在';
            resJson.code = 201;
        } else {
            category.create(req.body, function (err, result) {
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
    category(req.body).remove(function (err, result) {
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

