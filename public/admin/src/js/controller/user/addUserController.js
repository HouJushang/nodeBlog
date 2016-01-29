app.controller('addUserController', ['$scope', 'ajax', 'toast', '$state', function ($scope, ajax, toast, $state) {
    $scope.submit = function () {
        ajax.post({
            url: '/users/add',
            data: {
                name: $scope.name,
                password: $scope.password
            },
            toast: "添加中..."
        }).then(function (result) {
            $state.go('layout.user')
            toast.dismiss('添加成功!');
        })
    }
}]);