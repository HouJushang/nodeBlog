/**
 * Created by Laggo on 16/1/26.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('192.168.1.103','blog');
module.exports = db;