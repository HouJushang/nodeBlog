/**
 * Created by Laggo on 16/1/26.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('localhost','blog');
module.exports = db;