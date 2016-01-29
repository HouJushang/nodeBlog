var express = require('express');
var router = express.Router();
var users = require('../dbModel/users');
var resJson = require('../config/response');


/* admin user. */
router.post('/',function(req, res, next){

})
router.post('/add', function (req, res, next) {
    users.findOne({
        name: req.body.name
    }).exec(function (err, result) {
        if(result){
            resJson.mes = '管理员已经存在';
            resJson.code = 201;
        }else{
            users.create(req.body, function (err, result) {
                if (err) {
                    resJson.mes = '添加错误';
                    resJson.code = 201;
                } else {
                    resJson.data = result;
                    resJson.mes = '添加成功';
                }
            })
        }
        res.json(resJson);
    })
});

module.exports = router;
