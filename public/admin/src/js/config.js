/**
 * Created by Laggo on 11/4/15.
 */
var config = {
    //'SERVER_URL' : 'http://112.124.43.182/mastercai/'
    //'SERVER_URL' : 'http://192.168.1.106:8080/mastercai/'
    //'SERVER_URL' : 'http://192.168.1.111:8080/mastercai/'
    'SERVER_URL' : 'http://www.caidashi.cc/'
};
for(item in config){
    app.constant(item,config[item])
}
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
}]);
