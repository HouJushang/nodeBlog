app.service('toolService', function () {
    //json to array
    this.jsonToArray = function (json) {
        var newArray = [];
        for (item in json) {
            newArray.push(json[item]);
        }
        return newArray;
    };

    this.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + obj[key]);
        }
        return p.join('&');
    };

    this.inArray = function (ele, arr) {
        var isHave = false;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i]['commodityId'] === ele) {
                isHave = true;
            }
        }
        return isHave;
    };
    this.eleInArray = function (ele, arr) {
        for (var i = 0, length = arr.length; i < length; i++) {
            if (arr[i] == ele) {
                return i;
            }
        }
        return false;
    };
    //
    //this.arr=function(name){
    //    var item=[];
    //    for(var i= 0,len=name.length;i<len;i++){
    //        item.push(name[i])
    //    }
    //    if(angular.isUndefined(localStorage.popularSearch)){
    //        localStorage.popularSearch='';
    //    }
    //    localStorage.popularSearch+=item;
    //    return item
    //}


});
