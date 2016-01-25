/**
 * Created by Laggo on 11/5/15.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "www/html/home.html",
            controller: "HomeController"
        })
        .state('search', {
            url: "/search",
            templateUrl: "www/html/search.html",
            controller:"SearchController"
        })
        //登录
        .state('login', {
            url: "/login",
            templateUrl: "www/html/login.html",
            controller:"LoginController"
        })
        //注册第一步 邀请码
        .state('registercode', {
            url: "/registercode",
            templateUrl: "www/html/register_code.html",
            controller: 'RegisterCodeController'
        })
        //注册
        .state('register', {
            url: "/register/:code",
            templateUrl: "www/html/register.html",
            controller: "RegisterController"
        })

        .state('center', {
            url: "/center",
            templateUrl: "www/html/center.html",
            controller: "CenterController"
        })
        .state('myorder', {
            url: "/myorder/:type",
            templateUrl: "www/html/myorder.html",
            controller: "MyOrderController"
        })
        .state('myrank', {
            url: "/myrank",
            templateUrl: "www/html/myrank.html",
            controller: "MyRankController"
        })
        .state('order', {
            url: "/order/:id",
            templateUrl: "www/html/order.html",
            controller: "OrderController"
        })
        .state('setinfo', {
            url: "/setinfo",
            templateUrl: "www/html/setinfo.html",
            controller: "SetInfoController"
        })
        .state('info', {
            url: "/info",
            templateUrl: "www/html/info.html",
            controller: "InfoController"
        })
        .state('changepwd', {
            url: "/changepwd",
            templateUrl: "www/html/changepwd.html",
            controller: "ChangePwdController"
        })
        .state('forgetpwd', {
            url: "/forgetpwd",
            templateUrl: "www/html/forgetpwd.html",
            controller: "ForgetPwdController"
        })
        //地址列表
        .state('addresslist', {
            url: "/addresslist",
            templateUrl: "www/html/addresslist.html",
            controller: "AddressListController"
        })
        //增加地址
        .state('addaddress', {
            url: "/addaddress/:id",
            templateUrl: "www/html/addaddress.html",
            controller: "AddAddressController"
        })
        .state('cart', {
            url: "/cart/:name",
            templateUrl: "www/html/cart.html",
            controller: "CartController"
        })
        .state('checkout', {
            url: "/checkout",
            templateUrl: "www/html/checkout.html",
            controller: "CheckoutController"
        })
        .state('payWay', {
            url: "/payWay/:orderNo",
            templateUrl: "www/html/payWay.html",
            controller: "payWayController"
        })
        .state('pay', {
            templateUrl: "www/html/pay.html",
            controller: "payController"
        })
        .state('payIng', {
            url: "/payIng/:orderNo",
            templateUrl: "www/html/payIng.html",
            controller: "payIngController"
        })
        .state('demo', {
            url: "/demo",
            templateUrl: "www/html/demo.html",
            controller: "DemoController"
        })
}]);
