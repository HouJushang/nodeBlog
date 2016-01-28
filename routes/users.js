var express = require('express');
var router = express.Router();
var userModel = require('../dbModel/user');
var resJson = require('../config/response');

/* GET users listing. */
router.get('/add', function(req, res, next) {
  //userModel.findOne({
  //  name:req.body.name,
  //  password: req.body.password
  //}).exec(function(err,result){
  //  if(result){
  //    req.session.user_id = result._id;
  //    req.session.user = result.name;
  //    resJson.mes = '用户名已存在';
  //    resJson.data = result;
  //  }else{
  //    var krouky = new PersonModel({name:req.body.name,password: req.body.password});
  //    krouky.save();
  //    resJson.mes = '保存成功';
  //    resJson.data = result;
  //  }
  //  res.json(resJson);
  //});
  res.send('dafdsaf')
});


router.post('/del', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/update', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
