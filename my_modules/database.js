/**
 * Created by Laggo on 16/1/26.
 */
var mongoose = require("mongoose");
var opts = {user: 'Hou', pass: 'Hou6761886' }
var db = mongoose.createConnection('41js.com','blog',opts);
console.log('数据库连接成功')
module.exports = db;