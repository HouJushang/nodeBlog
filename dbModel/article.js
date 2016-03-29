var mongoose = require("mongoose");
var articleSchema = new mongoose.Schema({
    title: String,
    category: {type: mongoose.Schema.Types.ObjectId,ref:'category'},
    tag: String,
    recommend: String,
    content: String,
    htmlContent: String,
    description: String,
    updateTime: {type: Date},
    addTime: {type: Date, default: Date.now},
    count: {type: Number, default: 0},
    status: {type: Number, default: 1}
});
module.exports = require('../my_modules/database').model('article', articleSchema);