/**
 * Created by Laggo on 11/4/15.
 */
var config = {
    'BASE_URL' : 'http://www.41js.com/',
    'SERVER_URL' : 'http://www.41js.com/super'
};
for(item in config){
    app.constant(item,config[item])
}