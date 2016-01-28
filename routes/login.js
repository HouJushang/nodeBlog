var express = require('express');
var router = express.Router();
var UserModel = require('./database').model('User',require('../schema/userSchema'));

/* GET home page. */
router.post('/', function (req, res, next) {
    var json = require('../config/response');
    UserModel.findOne({
        name:req.body.name,
        password: req.body.password
    }).exec(function(err,result){
        if(result){
            json.mes = '登录成功';
            json.data = result;
        }else{
            json.code = 201;
            json.mes = '用户名和密码不匹配';
        }
        res.json(json);
    });
});
module.exports = router;
