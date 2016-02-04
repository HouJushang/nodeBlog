var mongoose = require("mongoose");
var recommendSchema = new mongoose.Schema({
    name: String
});
module.exports = require('../my_modules/database').model('recommend',recommendSchema);