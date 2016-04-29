app.controller('userController', ['$scope', 'ajax', 'toast', 'cAlert', function ($scope, ajax, toast, cAlert) {
    ajax.post({
        url: '/users'
    }).then(
        function (result) {
            $scope.list = result;
        }
    )

    $scope.del = function (id, index) {
        cAlert.create({
            mes: '是否确认登录!',
            comfirm: true,
            back: function () {
                ajax.post({
                    url: '/users/del',
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