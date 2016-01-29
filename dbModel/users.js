var mongoose = require("mongoose");
var usersSchema = new mongoose.Schema({
    name: String,
    password: String
});
module.exports = require('../my_modules/database').model('users',usersSchema);