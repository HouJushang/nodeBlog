var express = require('express');
var router = express.Router();
var article = require('../dbModel/article');
var webinfo = require('../my_modules/webinfo');


router.get('/', function (req, res, next) {
    webinfo.then(function(result){
        var renderData = {
            webinfo: result
        };
        console.log(renderData);
        res.render('index', renderData);
    });
    //var renderData = {};
    //article.find({})
    //    .populate('category')
    //    .exec(function (err, result) {
    //        renderData.list = result;
    //        webinfo.find({})
    //            .exec(function (err, result) {
    //                renderData.webinfo = result[0];
    //                res.render('index', renderData);
    //            })
    //    })
});

router.get('/article/:id', function (req, res, next) {
    var renderData = {};
    article.findOne({_id: req.params.id})
        .populate('category')
        .exec(function (err, result) {
            renderData.result = result;
            renderData.webinfo= {
                title : result.title,
                keword: result.keyword,
            }
            res.render('detail', renderData);
        })
})
module.exports = router;
