/**
 * Created by Laggo on 11/4/15.
 */
var app = angular.module('app', ['ui.router', 'ngStorage','ngAnimate','cAlert']);
app.run(['$rootScope', '$window', '$http', 'ajax', function ($rootScope, $window, $http, ajax) {


    //判断浏览器支持localstorage
    if (!window.localStorage || !window.sessionStorage) {
        alert("你的浏览器不支持storage");
    }

    if (localStorage.phone && localStorage.password) {
        ajax.post({
            url: 'customer/login',
            data: {
                phone: localStorage.phone,
                password: localStorage.password
            },
        }).then(function (result) {
            sessionStorage.username = result.managerName;
        })
    }

    $rootScope.goBack = function () {
        $window.history.back();
    };

    $http.defaults.withCredentials = true;


}]);