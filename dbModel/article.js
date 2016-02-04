var mongoose = require("mongoose");
var articleSchema = new mongoose.Schema({
    title: String,
    category: String,
    tag: String,
    recommend: String,
    content: String,
    time: {type: Date, default: Date.now},
    count: {type: Number, default: 0},
    status: {type: Number, default: 1}
});
module.exports = require('../my_modules/database').model('article', articleSchema);