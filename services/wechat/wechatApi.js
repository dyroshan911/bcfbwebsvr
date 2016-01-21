'use strict';
var wechatApi = require('wechat-api').myApi;
var customersDB = require("../db").Customers;
var usersDB = require("../db").Users;
var config = require('../config').data.main;


exports.createMenu = function (menu, callback) {
    wechatApi.createMenu(menu, function (err, result) {
        console.log(err);
        console.log(result);
        callback(err, result);
    });
}


exports.pushscheduleEvent = function (open_id, title, handleBy, phone, result, detail) {
    var templateId = config.wechat.pushMsgs.schedule.id;
    // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
    var url = '';
    var topcolor = '#FF0000'; // 顶部颜色
    //var time = new Date(parseInt(ts));

    var d = new Date(); //创建一个Date对象 
    var localTime = d.getTime();
    var localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数 
    var utc = localTime + localOffset; //utc即GMT时间 

    var offset = 8; //以北京时间，东8区 
    var beijing = utc + (3600000 * offset);
    var time = getTime(parseInt(beijing));


    var data = {
        "first": {
            "value": title,
            "color": "#173177"
        },
        "keyword1": {
            "value": handleBy,
            "color": "#173177"
        },
        "keyword2": {
            "value": phone,
            "color": "#173177"
        },
        "keyword3": {
            "value": result,
            "color": "#173177"
        },
        "keyword4": {
            "value": time,
            "color": "#173177"
        },
        "remark": {
            "value": detail,
            "color": "#173177"
        }
    };

    wechatApi.sendTemplate(open_id, templateId, url, topcolor, data, function (err, result) {
        if (err) {
            console.error('can not sendTemplate to wechat', err);
        }
    });
}


exports.pushIndentEvent = function (open_id, title, type, status, from, detail, remark) {
    var templateId = config.wechat.pushMsgs.alarm.id;
    // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
    var url = '';
    var topcolor = '#FF0000'; // 顶部颜色
    //var time = new Date(parseInt(ts));

    var d = new Date(); //创建一个Date对象 
    var localTime = d.getTime();
    var localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数 
    var utc = localTime + localOffset; //utc即GMT时间 

    var offset = 8; //以北京时间，东8区 
    var beijing = utc + (3600000 * offset);
    var time = getTime(parseInt(beijing));


    var data = {
        "first": {
            "value": title,
            "color": "#173177"
        },
        "keyword1": {
            "value": time,
            "color": "#173177"
        },
        "keyword2": {
            "value": type,
            "color": "#173177"
        },
        "keyword3": {
            "value": status,
            "color": "#173177"
        },
        "keyword4": {
            "value": from,
            "color": "#173177"
        },
        "keyword5": {
            "value": detail,
            "color": "#173177"
        },
        "remark": {
            "value": remark,
            "color": "#173177"
        }
    };

    wechatApi.sendTemplate(open_id, templateId, url, topcolor, data, function (err, result) {
        if (err) {
            console.error('can not sendTemplate to wechat', err);
        }
    });
}




function getTime(/** timestamp=0 **/) {
    var ts = arguments[0] || 0;
    var t, y, m, d, h, i, s;
    t = ts ? new Date(ts) : new Date();
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();  
    // 可根据需要在这里定义时间格式  
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
}  