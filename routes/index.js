var express = require('express');
var router = express.Router();

var categoryModel = require('../dbModel/category');
var artModel = require('../dbModel/article');

var artList = require('../my_modules/artList');
var webinfo = require('../my_modules/webinfo');
var baseData = require('../my_modules/base');


// index router
router.get('/', indexRouter);
router.get('/:page', indexRouter);
function indexRouter(req, res, next) {

    var currentPage = !isNaN(req.params.page) ? req.params.page : 1;
    var baseDataPromise = new Promise(function (resolve, reject) {
        baseData.then(function (result) {
            resolve(result);
        })
    });
    var webinfoPromise = new Promise(function (resolve, reject) {
        webinfo.then(function (result) {
            resolve(result)
        })
    });
    var articleList = new Promise(function (resolve, reject) {
        artList({
            data: {},
            page: {
                pageSize: 10,
                currentPage: currentPage
            }
        }).then(function (result) {
            resolve(result);
        })
    })
    Promise.all([baseDataPromise, webinfoPromise, articleList]).then(function (value) {
        //文章列表时间格式转换
        value[2][0].forEach(function (item, index, arr) {
            var dateObj = new Date(item.addTime);
            item.addTimeObj = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
        })

        //分页路径
        value[2][1].url = '/';
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            webinfo: value[1],
            listData: value[2][0],
            count: value[2][1],
        }
        res.render('index', renderData);
    }, function (reason) {
        res.render('error', {mes: reason});
    });
}

//分类查询文章
router.get('/categories/:id', function (req, res, next) {

    var baseDataPromise = new Promise(function (resolve, reject) {
        baseData.then(function (result) {
            resolve(result);
        })
    });
    var webinfoPromise = new Promise(function (resolve, reject) {
        webinfo.then(function (result) {
            resolve(result)
        })
    });
    var articleList = new Promise(function (resolve, reject) {
        artList({
            data: {
                category: req.params.id
            },
            page: {
                pageSize: 5,
                currentPage: 0
            }
        }).then(function (result) {
            resolve(result);
        })
    })
    Promise.all([baseDataPromise, articleList, webinfoPromise]).then(function (value) {
        value[1].forEach(function (item, index, arr) {
            var dateObj = new Date(item.addTime);
            item.addTimeObj = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
        })
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            listData: value[1],
            webinfo: value[2]
            //count: Math.ceil(value[3] / pageSize),
        }
        console.log(11111, renderData);
        res.render('index', renderData);
    })
})

//get tag atricle
router.get('/tags/:tag', function (req, res, next) {

    var baseDataPromise = new Promise(function (resolve, reject) {
        baseData.then(function (result) {
            resolve(result);
        })
    });
    var webinfoPromise = new Promise(function (resolve, reject) {
        webinfo.then(function (result) {
            resolve(result)
        })
    });
    var articleList = new Promise(function (resolve, reject) {
        artList({
            data: {
                tag: new RegExp(req.params.tag, "i")
            },
            page: {
                pageSize: 5,
                currentPage: 0
            }
        }).then(function (result) {
            resolve(result);
        })
    })
    Promise.all([baseDataPromise, articleList, webinfoPromise]).then(function (value) {
        value[1].forEach(function (item, index, arr) {
            var dateObj = new Date(item.addTime);
            item.addTimeObj = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
        })

        value[2][1].url = '/tags/';
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            listData: value[1][0],
            webinfo: value[2],
            count: value[1][1]
        }
        res.render('index', renderData);
    })
})


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
