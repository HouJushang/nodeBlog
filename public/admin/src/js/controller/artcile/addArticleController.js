app.controller('addArticleController', ['$scope', 'ajax', 'toast', '$state','BASE_URL', function ($scope, ajax, toast, $state,BASE_URL) {
    $scope.submit = function () {
        ajax.post({
            url: '/article/add',
            data: $scope.article,
            toast: "添加中..."
        }).then(
            function (result) {
                toast.dismiss('添加成功!');
                $state.go('layout.article')
            }
        )
    }

    $scope.uploadImg = function(file){
        ajax.upload(file).then(function(result){
            $scope.imgPath = BASE_URL+"/upload/"+result.filename;
        })
    }
}]);