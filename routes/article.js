/**
 * Created by Laggo on 16/1/28.
 */
var express = require('express');
var router = express.Router();
var marked = require('marked');
var article = require('../dbModel/article');
var resJson = require('../config/response');

/* category. */
router.post('/', function (req, res, next) {
    article.find({})
        .populate('category')
        .exec(function (err, result) {
            if (result) {
                console.log(result);
                resJson.mes = '文章列表';
                resJson.code = 200;
                resJson.data = result;
            } else {
                resJson.mes = '没有文章';
                resJson.code = 201;
            }
            res.json(resJson);
        })
});
router.post('/add', function (req, res, next) {
    req.body.htmlContent = marked(req.body.content);
    article.create(req.body, function (err, result) {
        if (err) {
            resJson.mes = '添加错误';
            resJson.code = 201;
        } else {
            resJson.code = 200;
            resJson.data = result;
            resJson.mes = '添加成功';
        }
    })
    res.json(resJson);
});
router.post('/del', function (req, res, next) {
    article(req.body).remove(function (err, result) {
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
router.post('/query', function (req, res, next) {
    article.findOne({_id: req.body.id})
        .exec(function (err, result) {
            if (!err) {
                resJson.mes = '数据获取成功';
                resJson.data = result;
                resJson.code = 200;
            } else {
                resJson.mes = '获取详情错误';
                resJson.code = 201;
            }
            res.json(resJson);
        })
})
router.post('/update',function(req,res,next){
    var conditions = { _id: req.body._id },
        update = req.body,
        options = { multi: true };
    article.update(conditions, update, options, function(err){
        if(!err){
            resJson.code = 200;
            resJson.mes='网站信息更新成功';
        }else{
            resJson.code = 201;
            resJson.mes='网站信息更新失败';
        }
        res.json(resJson);
    })
})


module.exports = router;

