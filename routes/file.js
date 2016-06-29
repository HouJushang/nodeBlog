const express = require('express');
const router = express.Router();
const resJson = require('../config/response');
const fs = require('fs');


/* POST file. */
router.get('/', function (req, res, next) {
    fs.readdir('public/upload', function (err, data) {
        if (err) {
            resJson.mes = err;
            resJson.code = 201;
        } else {
            resJson.code = 200;
            resJson.data = data;
            resJson.mes = '获取成功';
        }
        res.json(resJson);
    });
});
module.exports = router;
