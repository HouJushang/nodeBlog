app.controller('loginController', ['$scope', 'ajax', 'toast', function ($scope, ajax, toast) {
    $scope.submit = function () {
        ajax.post({
            url: '/login',
            data: {
                name: $scope.name,
                password: $scope.password
            },
            toast: "登录中..."
        }).then(
            function (result) {
                toast.dismiss('登录成功!');
            }
        )
    }
}]);