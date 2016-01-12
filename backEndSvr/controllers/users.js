'use strict';
var users = require("../services/db").Users;

exports.creatAccount = function (accountObj, cb) {
        users.createUser(accountObj, function (err, doc) {
            var result = {};
            var statusCode = 201;
            if (!err) {
                result = doc;
            } else {
                statusCode = 403;
                result.code = 'e1103';
                result.message = err.message;
                result.description = err.message;
                result.source = '<<webui>>';
            }
            cb(statusCode, result);
        });
};

exports.updateUser = function (token, userId, userObj, cb) {
    users.updateUser(userId, userObj, function (err, doc) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = doc;
        } else {
            statusCode = 500;
            result.code = 'e2001';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.getChannelsList = function (offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    users.getChannelsList(offset, limit, filter, function (err, doc) {
        if (!err) {
            result = doc;
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
} 

