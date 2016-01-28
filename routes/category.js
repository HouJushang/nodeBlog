/**
 * Created by Laggo on 16/1/28.
 */
var express = require('express');
var router = express.Router();
var userModel = require('../dbModel/user');
var resJson = require('../config/response');

/* GET home page. */
router.post('/add', function (req, res, next) {
    //userModel.findOne({
    //    name:req.body.name,
    //    password: req.body.password
    //}).exec(function(err,result){
    //    if(result){
    //        req.session.user_id = result._id;
    //        req.session.user = result.name;
    //        resJson.mes = '登录成功';
    //        resJson.data = result;
    //    }else{
    //        resJson.code = 201;
    //        resJson.mes = '用户名和密码不匹配';
    //    }
    //    res.json(resJson);
    //});
});
module.exports = router;

