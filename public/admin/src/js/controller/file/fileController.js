/**
 * Created by Hou on 16/3/29.
 */
app.controller('fileController', ['$scope', 'ajax', 'toast', '$state', 'cAlert', function ($scope, ajax, toast, $state, cAlert) {
    ajax.get({
        url: '/file',
        toast: "正在查询上传图片列表..."
    }).then(function (result) {
        $scope.resultData = result;
        toast.dismiss('end..!');
    })


    $scope.del = function (id, index) {
        cAlert.create({
            mes: '是否确认删除!',
            comfirm: true,
            back: function () {
                ajax.post({
                    url: '/friend/del',
                    data: {
                        _id: id
                    },
                    toast: "删除中..."
                }).then(
                    function (result) {
                        toast.dismiss('OK!');
                        $scope.resultData.splice(index, 1)
                    }
                )
            }
        })
    }

}]);
