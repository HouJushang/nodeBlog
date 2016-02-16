var express = require('express');
var router = express.Router();
var resJson = require('../config/response');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/upload/'});

router.post('/', upload.single('image'), function (req, res, next) {
    res.json({
        filename: req.file
    })
});

module.exports = router;
