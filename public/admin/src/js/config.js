/**
 * Created by Laggo on 11/4/15.
 */
var config = {
    'BASE_URL' : 'http://localhost:3030/',
    'SERVER_URL' : 'http://localhost:3030/super'
};
for(item in config){
    app.constant(item,config[item])
}