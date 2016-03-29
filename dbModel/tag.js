var mongoose = require("mongoose");
var tagSchema = new mongoose.Schema({
    name: String,
    count: {type: Number, default: 1},
});
module.exports = require('../my_modules/database').model('tag', tagSchema);