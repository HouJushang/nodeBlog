/**
 * Created by Laggo on 11/4/15.
 */
var config = {
    'SERVER_URL' : 'http://localhost:3200'
};
for(item in config){
    app.constant(item,config[item])
}
app.config(['$compileProvider', function ($compileProvider) {
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
}]);
