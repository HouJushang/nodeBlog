app.controller('listCategoryController', ['$scope', 'ajax', 'toast', 'categoryService', 'cAlert', function ($scope, ajax, toast, categoryService, cAlert) {
    categoryService.list().then(function (result) {
        $scope.list = result;
    })

    $scope.del = function (id, index) {
        cAlert.create({
            mes: '是否确认登录!',
            comfirm: true,
            back: function () {
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
        })
    };
}]);