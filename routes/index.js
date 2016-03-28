var express = require('express');
var router = express.Router();
var article = require('../dbModel/article');
var webinfo = require('../my_modules/webinfo');


router.get('/', function (req, res, next) {

    var webinfoPromise = new Promise(function (resolve, reject) {
        webinfo.then(function (result) {
            resolve(result)
        })
    });
    var articleList = new Promise(function (resolve, reject) {
        article
            .find({})
            .skip(0)
            .limit(3)
            .populate('category')
            .exec(function (err, result) {
                resolve(result);
            });
    })
    Promise.all([webinfoPromise, articleList]).then(function (value) {
        var renderData = {
            webinfo: value[0],
            listData: value[1]
        }
        res.render('index', renderData);
    }, function (reason) {
        res.render('error', reason);
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
