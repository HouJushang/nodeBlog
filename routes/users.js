var express = require('express');
var router = express.Router();
var users = require('../dbModel/users');
var resJson = require('../config/response');


/* admin user. */
router.post('/', function (req, res, next) {
    users.find({}).exec(function (err, result) {
        if (result) {
            resJson.mes = '管理员列表';
            resJson.code = 200;
            resJson.data = result;
        } else {
            resJson.mes = '没有管理员';
            resJson.code = 201;
        }
        res.json(resJson);
    })
})
router.post('/add', function (req, res, next) {
    users.findOne({
        name: req.body.name
    }).exec(function (err, result) {
        if (result) {
            resJson.mes = '管理员已经存在';
            resJson.code = 201;
        } else {
            users.create(req.body, function (err, result) {
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
    users(req.body).remove(function (err, result) {
        if (result) {
            console.log(result);
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
