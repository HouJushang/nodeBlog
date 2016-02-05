var express = require('express');
var router = express.Router();
var article = require('../dbModel/article');


/* POST login. */
router.get('/', function (req, res, next) {
    article.find({}).exec(function (err, result) {
        console.log(result);
        res.render('index',{
            title: '后居上博客-首页',
            list: result
        });
    })
});
module.exports = router;
