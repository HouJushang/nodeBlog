var webinfo = require('./webinfo');
var promise = function () {
    return new Promise(function (resolve, reject) {
        var webinfoPromise = new Promise(function (resolve1, reject1) {
            webinfo.find({}).exec(function (err, result) {
                if (err) {
                    reject1(error);
                } else {
                    resolve1(result[0]);
                }
            });
        });
        Promise.all([webinfoPromise]).then(function (value) {
            resolve(value)
        })
    })
}
module.exports = promise;