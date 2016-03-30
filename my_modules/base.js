var webinfo = require('../dbModel/webinfo');
var categoryModel = require('../dbModel/category');
var artModel = require('../dbModel/article');
var tagModel = require('../dbModel/tag');
var friendModel = require('../dbModel/friend')

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
//获取友情链接
var friendPromise = new Promise(function (resolve, reject) {
    friendModel.find({}).sort({sort: -1}).exec(function (err, result) {
        if (!err) {
            resolve(result)
        } else {
            reject(err)
        }
    })
})
//获取最新10篇文章
var newTenPromise = new Promise(function(resolve,reject){
    artModel.find().select('title').limit(10).exec(function(err,result){
        if (!err) {
            resolve(result)
        } else {
            reject(err)
        }
    })
})
module.exports = Promise.all([categoryData,tagPromise,friendPromise,newTenPromise]);