var express = require('express');
var router = express.Router();
var artList = require('../my_modules/artList');
var webinfo = require('../my_modules/webinfo');
var categoryModel = require('../dbModel/category');
var artModel = require('../dbModel/article')


router.get('/', function (req, res, next) {

    var pageSize = 5;
    var currentPage = 1;

    var webinfoPromise = new Promise(function (resolve, reject) {
        webinfo.then(function (result) {
            resolve(result)
        })
    });
    var articleList = new Promise(function (resolve, reject) {
        artList({
            data: {},
            page: {
                pageSize: 5,
                currentPage: 0
            }
        }).then(function (result) {
            resolve(result);
        })
    })
    var categoryData = new Promise(function (resolve, reject) {
        categoryModel.find({}).exec(function (err, result) {
            resolve(result);
        });
    })
    var count = new Promise(function (resolve, reject) {
        artModel.count().exec(function (err, result) {
            resolve(result);
        })
    })
    Promise.all([webinfoPromise, articleList, categoryData, count]).then(function (value) {
        value[1].forEach(function(item,index,arr){
            var dateObj = new Date(item.addTime);
            item.addTimeObj = dateObj.getFullYear()+"-"+(dateObj.getMonth()+1)+"-"+dateObj.getDate();
        })
        var renderData = {
            webinfo: value[0],
            listData: value[1],
            category: value[2],
            count: Math.ceil(value[3] / pageSize)
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
