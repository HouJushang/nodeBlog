var express = require('express');
var router = express.Router();
var article = require('../dbModel/article');
var webinfo = require('../my_modules/webinfo');


router.get('/', function (req, res, next) {

    var renderData = {};
    webinfo.then(function (result) {
        renderData.webinfo = result;
        article
            .find({})
            .skip(0)
            .limit(3)
            .populate('category')
            .exec(function (err, result) {
                renderData.listData = result;
                console.log(renderData);
                res.render('index', renderData);
            });
    });

});

router.get('/article/:id', function (req, res, next) {
    var renderData = {};
    article.findOne({_id: req.params.id})
        .populate('category')
        .exec(function (err, result) {
            renderData.result = result;
            renderData.webinfo = {
                title: result.title,
                keword: result.keyword,
            }
            res.render('detail', renderData);
        })
})
module.exports = router;
