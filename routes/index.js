var express = require('express');
var router = express.Router();
var artList = require('../my_modules/artList');
var webinfo = require('../my_modules/webinfo');
var categoryModel = require('../dbModel/category');
var artModel = require('../dbModel/article');
var tagModel = require('../dbModel/tag');
var baseData = require('../my_modules/base')


// index router

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
    var count = new Promise(function (resolve, reject) {
        artModel.count().exec(function (err, result) {
            resolve(result);
        })
    })
    //获取分类
    var categoryData = new Promise(function (resolve, reject) {
        categoryModel.find({}).exec(function (err, result) {
            resolve(result);
        });
    })
    //获取标签
    var tagPromise = new Promise(function (resolve, reject) {
        tagModel.find({}).exec(function (err, result) {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
    Promise.all([webinfoPromise, articleList, categoryData, count, tagPromise]).then(function (value) {
        value[1].forEach(function (item, index, arr) {
            var dateObj = new Date(item.addTime);
            item.addTimeObj = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
        })
        var renderData = {
            webinfo: value[0],
            listData: value[1],
            category: value[2],
            count: Math.ceil(value[3] / pageSize),
            tag: value[4]
        }
        baseData();
        res.render('index', renderData);
    }, function (reason) {
        res.render('error', {mes: reason});
    });

});

//article detail router
router.get('/article/:id', function (req, res, next) {
    var webinfoPromise = new Promise(function (resolve, reject) {
        webinfo.then(function (result) {
            resolve(result)
        })
    });
    var categoryData = new Promise(function (resolve, reject) {
        categoryModel.find({}).exec(function (err, result) {
            resolve(result);
        });
    })
    var artPromise = new Promise(function (resolve, reject) {
        artModel.findOne({_id: req.params.id})
            .populate('category')
            .exec(function (err, result) {
                var conditions = {_id: result._id},
                    update = {count: result.count + 1},
                    options = {multi: true};
                artModel.update(conditions, update, options, function (err) {
                    if (!err) {
                        console.log('阅读次数增加成功!')
                    } else {
                        console.log('阅读次数增加成功失败!')
                    }
                });
                resolve(result)
            })
    });
    Promise.all([webinfoPromise, categoryData, artPromise]).then(function (value) {
        renderData = {};
        renderData.webinfo = {
            title: value[2].title + '-' + value[0].title,
            keword: value[2].keyword,
            description: value[2].description
        }
        renderData.category = value[1];
        value[2].addTimeObj = value[2].addTime.getFullYear() + "-" + (value[2].addTime.getMonth() + 1) + "-" + value[2].addTime.getDate();
        renderData.artData = value[2];
        res.render('detail', renderData);
    }, function (reason) {
        res.render('error', reason);
    })

})
module.exports = router;
