app.service('ajax', ['$q', '$http','$rootScope', 'SERVER_URL', '$state', 'cAlert', 'toast',function ($q, $http, $rootScope,SERVER_URL, $state,cAlert,toast)
{
    this.post = function (postData) {
        return this.ajax(postData, 'POST');
    };
    this.get = function (postData) {
        return this.ajax(postData, 'GET');
    };
    this.ajax = function (postData, method) {
        if(postData.toast&&$rootScope.toast.has){
            alert('不要重复操作!');
        }
        if(postData.toast){
            toast.create(postData.toast);
        }
        var defer = $q.defer();
        var promise = defer.promise;
        $http({
            method: method,
            url: SERVER_URL + postData.url,
            params: postData.data,
        }).then(
            function success(response) {
                if (response.data.code == 0) {
                    defer.resolve(response.data.data);
                }
                else if (response.data.code == 1002 || response.data.code == 1003||response.data.code == 3001) {
                    sessionStorage.username = '';
                    localStorage.phone = '';
                    localStorage.password = '';
                    cAlert.create({
                        mes:response.data.msg
                    });
                    defer.reject(response.data.msg);
                    $state.go('login');
                }
                else {
                    cAlert.create({
                        mes:response.data.msg
                    })
                }
            },
            function failed(response) {
                cAlert.create({
                    mes:'当前下单人数过多，请稍后再试！'
                })
            }
        );
        return promise
    }
}
])
;
