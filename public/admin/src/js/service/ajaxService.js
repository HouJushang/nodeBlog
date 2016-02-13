app.service('ajax', ['$q', '$http','$rootScope', 'SERVER_URL', '$state', 'cAlert', 'toast',function ($q, $http, $rootScope,SERVER_URL, $state,cAlert,toast)
{
    this.post = function (postData) {
        var req = {
            method: 'POST',
            url: SERVER_URL + postData.url,
            data: postData.data
        }
        return this.ajax(req,postData);
    };

    this.get = function (postData) {
        var req = {
            method: 'GET',
            url: SERVER_URL + postData.url,
            params: postData.data
        }
        return this.ajax(req,postData);
    }

    this.ajax = function (req,postData) {
        if(postData.toast&&$rootScope.toast.has){
            alert('不要重复操作!');
            return false
        }
        if(postData.toast){
            toast.create(postData.toast);
        }
        var defer = $q.defer();
        var promise = defer.promise;
        $http(req).then(
            function success(response) {
                if(response.data.code==200){
                    defer.resolve(response.data.data);
                }else{
                    cAlert.create({
                        mes:response.data.mes
                    })
                }
            },
            function failed(response) {
                cAlert.create({
                    mes:'服务端错误！'
                })
            }
        );
        return promise
    }
}
])
;
