var mongoose = require("mongoose");
var webinfoSchema = new mongoose.Schema({
    title: String,
    description: String,
    keyword: String
});
module.exports = require('../my_modules/database').model('webinfo',webinfoSchema);