/**
 * Created by Laggo on 11/4/15.
 */
var config = {
    'SERVER_URL' : 'http://www.houjushang.com/super'
};
for(item in config){
    app.constant(item,config[item])
}