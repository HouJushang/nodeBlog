var webinfo = require('../dbModel/webinfo');
function getWebinfo(){
    webinfo.find({}).exec(function (err,result){
        return result[0];
    });
}
module.exports = getWebinfo;