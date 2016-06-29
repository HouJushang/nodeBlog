var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/upload/'});

router.post('/', upload.single('file'), function (req, res, next) {
    res.json({
        filename: req.file.filename
    })
});

module.exports = router;
