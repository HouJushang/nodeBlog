var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    password: String
});
module.exports = require('../my_modules/database').model('user',userSchema) ;