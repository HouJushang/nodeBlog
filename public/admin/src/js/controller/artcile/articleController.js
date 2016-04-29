app.controller('articleController', ['$scope', 'ajax', 'toast', 'articleService', 'cAlert', function ($scope, ajax, toast, articleService, cAlert) {

    $scope.getData = function (page) {
        console.log(page);
        articleService.list({
            page: page
        }).then(function (result) {
            $scope.list = result[0];
            $scope.page = result[1];
        })
    }
    $scope.getData(1);

    articleService.list().then(function (result) {
        $scope.list = result[0];
        $scope.page = result[1];
        console.log($scope.page);
    })

    $scope.del = function (id, index) {
        cAlert.create({
            mes: '是否确认登录!',
            comfirm: true,
            back: function () {
                ajax.post({
                    url: '/article/del',
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

    //$scope.del = function(id,index){
    //    ajax.post({
    //        url: '/article/del',
    //        data:{
    //          _id: id
    //        },
    //        toast: "删除中..."
    //    }).then(
    //        function (result) {
    //            toast.dismiss('OK!');
    //            $scope.list.splice(index,1)
    //        }
    //    )
    //}
}]);