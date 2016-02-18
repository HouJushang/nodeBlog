var express = require('express');
var router = express.Router();
var resJson = require('../config/response');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/upload/'});

router.post('/', upload.single('file'), function (req, res, next) {
    console.log(req.file);
    res.json({
        filename: req.file.filename
    })
});

module.exports = router;
