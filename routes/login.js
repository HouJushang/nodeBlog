var express = require('express');
var router = express.Router();
var UserModel = require('./database').model('User',require('../schema/userSchema'));

/* GET home page. */
router.get('/', function (req, res, next) {
    var json = {
        code: 1,
        mes: '信息标识',
        data: ''
    }
    UserModel.findOne({
        name:'hou'
    }).exec(function(err,result){
        if(result){
            json.data = result;
        }else{
            console.log('没有数据!');
        }
        console.log(json);
        res.render('index', {title: json});
    });
});
module.exports = router;
