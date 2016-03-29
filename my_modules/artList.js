var article = require('../dbModel/article');
var promise = function (option) {
    return new Promise(function (resolve, reject) {
        article.find(option.data).skip((option.page.currentPage)*option.page.pageSize).limit(option.page.pageSize).exec(function (err, result) {
            if (err) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
module.exports = promise;