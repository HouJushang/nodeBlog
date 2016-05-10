var express = require('express');
var router = express.Router();

var artModel = require('../dbModel/article');
var artList = require('../my_modules/artList');
var webinfo = require('../my_modules/webinfo');
var baseData = require('../my_modules/base');


router.get('/leave',function(req, res, next){
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
    Promise.all([baseDataPromise, webinfoPromise]).then(function (value) {
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            webinfo: value[1],
            nav: 'leave'
        }
        res.render('leave', renderData);
    }, function (reason) {
        res.render('error', {mes: reason});
    });
})



router.get('/about',function(req, res, next){
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
    Promise.all([baseDataPromise, webinfoPromise]).then(function (value) {
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            webinfo: value[1],
            nav: 'about'
        }
        res.render('about', renderData);
    }, function (reason) {
        res.render('error', {mes: reason});
    });
})

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
            nav: 'index'
        }
        res.render('index', renderData);
    }, function (reason) {
        res.render('error', {mes: reason});
    });
}

//分类查询文章
router.get('/categories/:id', categoryRouter)
router.get('/categories/:id/:page', categoryRouter)
function categoryRouter(req, res, next) {
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
            data: {
                category: req.params.id
            },
            page: {
                pageSize: 10,
                currentPage: currentPage
            }
        }).then(function (result) {
            resolve(result);
        })
    })
    Promise.all([baseDataPromise, articleList, webinfoPromise]).then(function (value) {
        value[1][0].forEach(function (item, index, arr) {
            var dateObj = new Date(item.addTime);
            item.addTimeObj = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
        })
        value[1][1].url = '/categories/' + req.params.id + '/';
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            listData: value[1][0],
            count: value[1][1],
            webinfo: value[2],
            nav: 'index'
        }
        res.render('index', renderData);
    })
}


//get tag atricle
router.get('/tags/:tag/:page', tagRouter);
router.get('/tags/:tag', tagRouter);
function tagRouter(req, res, next) {
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
            data: {
                tag: new RegExp(req.params.tag, "i")
            },
            page: {
                pageSize: 10,
                currentPage: currentPage
            }
        }).then(function (result) {
            resolve(result);
        })
    })
    Promise.all([baseDataPromise, articleList, webinfoPromise]).then(function (value) {
        value[1][0].forEach(function (item, index, arr) {
            var dateObj = new Date(item.addTime);
            item.addTimeObj = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
        })
        value[1][1].url = '/tags' + req.params.tag + '/';
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            listData: value[1][0],
            count: value[1][1],
            webinfo: value[2],
            nav: 'index'
        }
        res.render('index', renderData);
    })
}


//article detail router
router.get('/article/:id', function (req, res, next) {
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
                    resolve(result);
                });
                
            })
    });
    Promise.all([baseDataPromise, artPromise,webinfoPromise]).then(function (value) {
        value[1].addTimeObj = value[1].addTime.getFullYear() + "-" + (value[1].addTime.getMonth() + 1) + "-" + value[1].addTime.getDate();
        var renderData = {
            category: value[0][0],
            tag: value[0][1],
            friend: value[0][2],
            newTen: value[0][3],
            webinfo:{
                title: value[1].title + '-' + value[2].title,
                keword: value[1].keyword,
                description: value[1].description
            },
            artData: value[1],
            nav : 'index'
        };
        res.render('detail', renderData);
    }, function (reason) {
        res.render('error', reason);
    })
})

module.exports = router;
