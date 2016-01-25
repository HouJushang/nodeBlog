/**
 * Created by Laggo on 11/4/15.
 */
var app = angular.module('app', ['ui.router', 'ngStorage', 'ngTouch','ngAnimate','cAlert']);
app.run(['$rootScope', '$window', '$http', 'ajax','cartService', function ($rootScope, $window, $http, ajax,cartService) {

    var bodyHeight = $window.innerHeight+'px';
    document.getElementById('body').style.height = bodyHeight;


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


    //初始化购物车
    if (!localStorage.cart) localStorage.cart = JSON.stringify({});
    $rootScope.cart = JSON.parse(localStorage.cart);

    cartService.total($rootScope.cart);

}]);