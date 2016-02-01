app.controller('addArticleController', ['$scope', 'ajax', 'toast', '$state', function ($scope, ajax, toast, $state) {
    $scope.$watch('content', function (newValue, oldValue) {
        $scope.markContent = marked(newValue);
    })

    $scope.submit = function () {
        var a = marked('#TEST');
        console.log(a);
        //ajax.post({
        //    url: '/users/add',
        //    data: {
        //        name: $scope.name,
        //        password: $scope.password
        //    },
        //    toast: "添加中..."
        //}).then(function (result) {
        //    toast.dismiss('添加成功!');
        //    $state.go('layout.user')
        //})
    }
}]);