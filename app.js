var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./services/config');

var wechat = require('wechat');
var wechat_api = require('wechat-api');
var wechatOAuth = require('wechat-oauth');
var schedule = require("node-schedule");




//config init
var mainConfig = config.load('main', './config/main.json', function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
}).data.main;


//init wechat menu config
var menuConfig = config.load('wechatMenu','./config/wechatMenu.json', function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
}).data.wechatMenu;

var api = new wechat_api(mainConfig.wechat.appId, mainConfig.wechat.appSecret);
wechat_api.myApi = api;
var auth = new wechatOAuth(mainConfig.wechat.appId, mainConfig.wechat.appSecret);
wechatOAuth.myAuth = auth;

/*api.createMenu(menuConfig.menu, function (err, result) {
  console.log(err);
  console.log(result);
});*/




//database init
var db = require("./services/db")
.error(function (err) {
    console.error(err);
}).config(mainConfig.db.url, mainConfig.db.options)//"mongodb://localhost/AdminService"  "mongodb://localhost/adminWebDb"
.start();

//cache init
var cache = require("./services/cache");
cache.init(function (err) {
    console.error(err);
    process.exit(1);
});

var routes = require('./routes/index');
var apiAccounts = require('./routes/users');
var apiCustomers = require('./routes/customer');
var wechats = require('./routes/wechats');
var apiSessions = require('./routes/sessions');
var apiBackDoor = require('./routes/backDoor');
var apiWebShows = require('./routes/webShow');
var wechatMsg = require('./controllers/wechatMsg.js');
var accounts = require('./controllers/users.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/img/favicon32.png'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var config_weixin = {
    token: mainConfig.wechat.token,
    appid: mainConfig.wechat.appId,
    encodingAESKey: mainConfig.wechat.encodingAESKey
};

app.use('/wechat', wechat(config_weixin)
    .text(wechatMsg.text)
    .image(wechatMsg.image)
    .voice(wechatMsg.voice)
    .video(wechatMsg.video)
    .location(wechatMsg.location)
    .link(wechatMsg.link)
    .event(wechatMsg.event)
    .device_text(wechatMsg.device_text)
    .device_event(wechatMsg.device_event)
    .middlewarify());





app.use('/', routes);
app.use(apiSessions.verify()); //@tip by Kai: Token should be verified every api request except create session
app.use('/api/sessions', apiSessions);
app.use('/api/accounts', apiAccounts);
app.use('/api/wechat', wechats);
app.use('/api/customers', apiCustomers);
app.use('/api/backDoor', apiBackDoor);
app.use('/api/webShow', apiWebShows);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;   
var j = schedule.scheduleJob(rule, accounts.scheduleJob);

var server = app.listen(process.env.PORT || mainConfig.servers.websvr.port, function() {
    console.log('listening on port %d', server.address().port);
});

module.exports = app;
