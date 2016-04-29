app.service('articleService', ['ajax', '$q', function (ajax, $q) {
    this.list = function (data) {
        var defer = $q.defer();
        var promise = defer.promise;
        ajax.post({
            url: '/article',
            data: data
        }).then(function (result) {
            defer.resolve(result);
        })
        return promise
    }
}]);

