var express = require('express');
var router = express.Router();
var db = require('./database');
var UserModel = db.model('User',require('../schema/userSchema'));

/* GET home page. */
router.get('/login', function (req, res, next) {
    //UserModel.findOne({
    //    name:'hou'
    //}).exec(function(err,data){
    //    if(data){
    //        console.log(data)
    //    }else{
    //        console.log('没有数据!');
    //    }
    //});
    res.render('index', {title: '桂晓晓222'});
});
module.exports = router;
