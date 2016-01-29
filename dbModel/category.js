var mongoose = require("mongoose");
var categorySchema = new mongoose.Schema({
    name: String
});
module.exports = require('../my_modules/database').model('category',categorySchema) ;