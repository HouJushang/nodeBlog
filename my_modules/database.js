/**
 * Created by Laggo on 16/1/26.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('www.41js.com','blog');
console.log('数据库连接成功')
module.exports = db;