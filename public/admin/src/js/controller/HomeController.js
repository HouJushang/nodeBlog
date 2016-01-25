app.controller('HomeController', ['$scope', '$rootScope', 'cartService','ajax','$state', function ($scope, $rootScope, cartService,ajax,$state) {

    $scope.data={
        categoryId:'',//类目id
        aClassLength:'',
        isActive:true,
        width: ''
    };
    $scope.initCat = {
        isOne: '',
        isTwo: ''
    };


    $scope.clearCart=function(){};
    //默认展示一级类目第一条的二级类目的第一条里面的商品= =
    show();
    function show() {
        ajax.get({
            url: 'category/list',
            data:{
                level:1
            }
        }).then(function (result) {
            isOne(result);
            setOneWidth(result.length);
            $scope.classAlist=result;
            ajax.get({
                url: 'category/list',
                data:{
                    parentId:result[0].categoryId
                }
            }).then(function (result) {
                isTwo(result);
                $scope.classBlist=result;
                ajax.get({
                    url: 'commodity/page',
                    data:{
                        categoryId:result[0].categoryId,
                        pageSize: 9999
                    }
                }).then(function (result) {
                    $scope.productList=result.resultData;
                })
            })
        })
    }

    //点击展示二级类目
    $scope.showClassBlist=function(categoryId){
        $scope.productList = '';
        isOne(categoryId);
        $scope.classBlist = '';
        ajax.get({
            url: 'category/list',
            data:{
                parentId:categoryId
            }
        }).then(function (result) {
            isTwo(result);
            $scope.classBlist=result;
           if(!result.length==0){
               ajax.get({
                   url: 'commodity/page',
                   data:{
                       categoryId:result[0].categoryId,
                       pageSize: 9999
                   }
               }).then(function (result) {
                   $scope.productList=result.resultData;
               })
           }
        })
    };

    //点击展示蔬菜数据
    $scope.showCommodity=function(categoryId){
        $scope.productList = '';
        isTwo(categoryId);
        ajax.get({
            url: 'commodity/page',
            data:{
                categoryId:categoryId,
                pageSize: 99999
            }
        }).then(function (result) {
            $scope.productList=result.resultData;
        })
    };

    //设置一级类目宽度
    function setOneWidth(num){
        $scope.data.width=num*100+'px';
    }


    //判断一级类目显示高亮
    function isOne(data){
        angular.isArray(data) ? $scope.initCat.isOne=data[0].categoryId : $scope.initCat.isOne=data;
    }

    //判断二级类目显示高亮
    function isTwo(data){
        angular.isArray(data) ? $scope.initCat.isTwo=data[0].categoryId : $scope.initCat.isTwo=data;
    }

    //商品详情操作
    $scope.moreProduct = {
        isShow: '',
        description: '',
        name: '',
        price: '',
        image: '',
        unit: '',
        quantity: '',
        obj: ''
    };
    $scope.add = function () {
        $scope.moreProduct.quantity++;
        cartService.change($scope.moreProduct.obj, $scope.moreProduct.quantity);
    };
    //减少商品数量
    $scope.reduce = function () {
        $scope.moreProduct.quantity--;
        if ($scope.moreProduct.quantity < 0)
            $scope.moreProduct.quantity = 0;
        cartService.change($scope.moreProduct.obj, $scope.moreProduct.quantity);
    };

}]);