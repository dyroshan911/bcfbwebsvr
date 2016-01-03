'use strict';
var users = require("../services/db").Users;
var sessions = require('../services/cache').Sessions;

exports.creatAccount = function (token, accountObj, cb) {
    sessions.getSessionAttrs(token, ['open_id'], function (err, data) {
        if (!err && data && data.open_id) {
            accountObj.openId = data.open_id;
        }

        users.createUser(accountObj, function (err, doc) {
            var result = {};
            var statusCode = 201;
            if (!err) {
                var userData = {
                    user_id: doc.id,
                    user_name: doc.user_name,
                    role: doc.role,
                    superior: doc.superior,
                    true_name: doc.true_name,
                    open_id: data.open_id,
                    complete: doc.complete
                };
                sessions.updateSession(token, userData, function (err, data) {
                    if (err) { console.error('update session error'); }
                });
                result = { user_id: doc.id };
            } else {
                statusCode = 403;
                result.code = 'e1103';
                result.message = err.message;
                result.description = err.message;
                result.source = '<<webui>>';
            }
            cb(statusCode, result);
        });
    })

};

exports.bindAccount = function (token, accountObj, cb) {
    var result = {};
    var statusCode = 201;
    sessions.getSessionAttrs(token, ['open_id'], function (err, data) {
        if (!err && data && data.open_id) {
            users.bindUsrByOpenid(data.open_id, accountObj.userName, accountObj.password, function (err, doc) {
                if (!err) {
                    var userData = {
                        user_id: doc.id,
                        user_name: doc.user_name,
                        role: doc.role,
                        superior: doc.superior,
                        true_name: doc.true_name,
                        open_id: data.open_id,
                        complete: doc.complete
                    };
                    sessions.updateSession(token, userData, function (err, data) {
                        if (err) { console.error('update session error'); }
                    });
                    result = { user_id: doc.id };
                } else {
                    statusCode = 403;
                    result.code = 'e1103';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 403;
            result.code = 'e1103';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    })

};

exports.getMembersList = function (token, offset, limit, filter, cb) {
    sessions.getSessionAttrs(token, ['role', 'user_id'], function (err, data) {
        var result = {};
        var statusCode = 201;
        if (!err && data.user_id && data.role != 'member') {
            users.getMembersList(data.user_id, offset, limit, filter, function (err, doc) {
                if (!err) {
                    result = doc;
                } else {
                    statusCode = 403;
                    result.code = 'e2001';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 403;
            result.code = 'e2001';
            result.message = 'err.message';
            result.description = 'Without permission';
            result.source = '<<webui>>';
        }
    });
}

exports.scheduleJob = function () {
    console.log('begin schedule------->')
    users.clearTodayCount();
}