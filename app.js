var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var session = require('express-session');
var login = require('./routes/login');
var users = require('./routes/users');
//var exphbs = require('express-handlebars');
var swig = require('swig');
var app = express();


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({secret: 'blog', cookie: {maxAge: 6000 * 60}, resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//route
var indexRouter = require('./routes/index');

//前台页面路由
app.use('/', indexRouter);

var loginRoute = require('./routes/login');
app.use('/super/login', loginRoute);

//登录拦截器
app.use('/super/', function (req, res, next) {
    if (req.session.user_id) {
        next();
    } else {
        res.json({
            code: 202,
            mes: '没有登录'
        });
    }
});
var routerArr = ['users', 'category', 'recommend', 'article', 'upload', 'webinfo', 'information', 'friend','file'];
routerArr.forEach(function (item) {
    var route = require('./routes/' + item);
    app.use('/super/' + item, route);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//var mongoose = require("mongoose");
//var db = mongoose.createConnection('localhost', 'blog');
//db.on('error', console.error);
//db.once('open', function () {
//    //console.log('mongodb is true')
//});
module.exports = app;
