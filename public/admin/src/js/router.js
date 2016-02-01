/**
 * Created by Laggo on 11/5/15.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    // Now set up the states
    $stateProvider
        //登录
        .state('login', {
            url: "/login",
            templateUrl: "www/html/login.html",
            controller: "loginController"
        })
        //布局
        .state('layout', {
            url: "/layout",
            templateUrl: "www/html/layout.html",
            controller: "layoutController"
        })
        //栏目
        .state('layout.category', {
            url: "/category",
            templateUrl: "www/html/category/list.html",
            controller: "listCategoryController"
        })
        .state('layout.addcategory', {
            url: "/addcategory",
            templateUrl: "www/html/category/add.html",
            controller: "addCategoryController"
        })
        //管理员管理
        .state('layout.user', {
            url: "/user",
            templateUrl: "www/html/user/list.html",
            controller: "userController"
        })
        .state('layout.adduser', {
            url: "/adduser",
            templateUrl: "www/html/user/add.html",
            controller: "addUserController"
        })
        //文章管理
        .state('layout.addarticle',{
            url: "/addarticle",
            templateUrl: "www/html/article/add.html",
            controller: "addArticleController"
        })
}]);
