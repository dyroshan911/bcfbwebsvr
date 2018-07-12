'use strict';
var policys = require("../services/db").Policys;
var sessions = require('../services/cache').Sessions;
var users = require("../services/db").Users;
var wechatApi = require("../services/wechat/wechatApi")


exports.creatPolicy = function (token, policyObj, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role', 'superior'], function (err, data) {
        if (!err && data.user_id) {
            if (data.role == 'member') {
                policyObj.mem_id = data.user_id;
                policyObj.channel_id = data.superior;
            } else {
                policyObj.channel_id = data.user_id;
            }
            policys.createPolicy(policyObj, function (err, policy) {
                if (!err) {
                    result = policy;
                    cb(statusCode, result);
                } else {
                    statusCode = 500;
                    result.code = 'e0001';
                    result.message = err.message;
                    result.description = 'creatPolicy';
                    result.source = '<<webui>>';
                }
            });
        } else {
                policyObj.channel_id = "af7687de-5c04-47f5-ab7b-31e9417e47c8";

                policys.createPolicy(policyObj, function (err, policy) {
                    if (!err) {
                        result = policy;
                        cb(statusCode, result);
                    } else {
                        statusCode = 500;
                        result.code = 'e0001';
                        result.message = err.message;
                        result.description = 'creatPolicy';
                        result.source = '<<webui>>';
                    }
                });
        }

    });
};


exports.getPolicyList = function (token, offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            policys.getPolicyList(data.user_id, data.role, offset, limit, filter, function (err, doc) {
                result = doc;
                cb(statusCode, result);
            });
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'err.message';
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
}


exports.getPolicyListById = function (token, accountId, offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            if (data.role = 'admin');
            var qeryAttr = 'role superior';
            users.queryUser(accountId, qeryAttr, function (err, user) {
                err;
                policys.getPolicyList(accountId, user.role, offset, limit, filter, function (err, doc) {
                    err;
                    result = doc;
                    cb(statusCode, result);
                });
            });
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'err.message';
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
}