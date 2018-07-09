var express = require('express');
var router = express.Router();

var wechatApi = require('wechat-api').myApi;
var wecahtOAuth = require('wechat-oauth').myAuth;
var sessions = require('../services/cache').Sessions;

/** wechat api get js_config api*/
router.post('/js_config', function (req, res) {
    var param = {
        debug: req.body.data.debug,
        jsApiList: req.body.data.jsApiList,
        url: req.body.data.configUrl
    };
    wechatApi.getJsConfig(param, function (err, result) {
        var data = {};
        if (err) {
            data.resultCode = 'F';
            data.content = err;
            res.send(data);
        } else {
            data.resultCode = 'S';
            data.content = result;
            res.send(data);
        }
    });
});


/** wechat api get js_config api*/
router.post('/auth', function(req, res) {
    //get accessToken  openid
    var param = {
        code: req.body.code,
        state: req.body.state,
    };
    wecahtOAuth.getAccessToken(param.code, function(err, result) {
                var data = {};
        if (err) {
            data.resultCode = 'F';
            data.content = err;
            res.send(data);
        } else {
            data.resultCode = 'S';
            data.content = result;
            res.send(data);
        }
    });
});



/** wechat api update wechat menu api*/
router.post('/menu', function (req, res) {
    var result = {};
    var statusCode = 200;
    var token = req.query.token;
    sessions.getSessionAttrs(token, ['open_id'], function (err, data) {
        if (err || data.open_id !== 'all') {
            statusCode = 400;
            result.code = 'e0001';
            result.message = err ? err.message : 'no rights';
            result.description = 'update menu';
            result.source = '<<webui>>';
            res.status(statusCode).json(result);
            return;
        }
        var menuConfig = require('../services/config').loadWechatMenu('./config/wechatMenu.json', function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        }).menuData;
        wechatApi.createMenu(menuConfig.menu, function (err, result) {
            if (err) {
                statusCode = 400;
                result.code = 'e0001';
                result.message = err.message;
                result.description = 'update menu';
                result.source = '<<webui>>';
                res.status(statusCode).json(result);
            } else {
                res.status(statusCode).json(result);
            }
        });
    });
});




module.exports = router;