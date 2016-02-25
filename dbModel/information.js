var mongoose = require("mongoose");
var informationSchema = new mongoose.Schema({
    img: String,
    name: String,
    wisdom : String,
    introduction : String,
    weibo : String,
    github : String,
    emali : String
});
module.exports = require('../my_modules/database').model('information',informationSchema);