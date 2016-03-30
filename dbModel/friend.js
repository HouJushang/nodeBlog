var mongoose = require("mongoose");
var friendSchema = new mongoose.Schema({
    name: String,
    url: String,
    sort: Number
});
module.exports = require('../my_modules/database').model('friend', friendSchema);