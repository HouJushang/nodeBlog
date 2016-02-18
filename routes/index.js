var express = require('express');
var router = express.Router();
var article = require('../dbModel/article');


/* POST login. */
router.get('/', function (req, res, next) {
    article.find({})
        .populate('category')
        .exec(function (err, result) {
            res.render('index', {
                title: '后居上博客-首页',
                list: result
            });
        })
});
router.get('/article/:id',function(req, res, next){
    article.findOne({_id:req.params.id})
        .populate('category')
        .exec(function (err, result) {
            console.log({
                result: result
            });
            res.render('detail', {
                title: result.title+'-后居上博客',
                result: result
            });
        })
    console.log(req.params.id);
})
module.exports = router;
