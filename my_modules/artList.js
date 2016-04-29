var article = require('../dbModel/article');
function pageDo(cur, total) {
    var arr = [];
    arr.push(cur);
    for (var i = 1; i < 5; i++) {
        if (parseInt(cur) + i <= total) {
            arr.push(parseInt(cur) + i);
            if (arr.length >= 5) {
                break;
            }
        }
        if (cur - i >= 1) {
            arr.unshift(cur - i);
            if (arr.length >= 5) {
                break;
            }
        }
    }
    return arr;
}
var promise = function (option) {
    var artPromise = new Promise(function (resolve, reject) {
        article.find(option.data).skip((option.page.currentPage - 1) * option.page.pageSize).limit(option.page.pageSize).sort({_id: -1}).populate('category').exec(function (err, result) {
            if (err) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
    var countPromise = new Promise(function (resolve, reject) {
        article.count(option.data).exec(function (err, result) {
            if (err) {
                reject(error);
            } else {
                var page = {
                    totalPage: Math.ceil(result / option.page.pageSize),
                    currentPage: option.page.currentPage,
                    page: pageDo(option.page.currentPage, Math.ceil(result / option.page.pageSize)),
                    fristPage: option.page.currentPage - 1,
                    lastPage: parseInt(option.page.currentPage) + 1,
                    pageSize: result
                }
                resolve(page);
            }
        });
    });
    return Promise.all([artPromise, countPromise]);
}

module.exports = promise;