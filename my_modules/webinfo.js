var webinfo = require('../dbModel/webinfo');
var promise = new Promise(function (resolve, reject) {
    webinfo.find({}).exec(function (err, result) {
        if (err) {
            reject(error);
        } else {
            resolve(result[0]);
        }
    });
});
module.exports = promise;