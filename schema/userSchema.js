var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    password: String
});
module.exports = userSchema;