app.controller('listCategoryController', ['$scope', 'ajax', 'toast', function ($scope, ajax, toast) {
    ajax.post({
        url: '/category'
    }).then(
        function (result) {
            $scope.list = result;
        }
    )

    $scope.del = function (id, index) {
        ajax.post({
            url: '/category/del',
            data: {
                _id: id
            },
            toast: "删除中..."
        }).then(
            function (result) {
                toast.dismiss('OK!');
                $scope.list.splice(index, 1)
            }
        )
    }
}]);