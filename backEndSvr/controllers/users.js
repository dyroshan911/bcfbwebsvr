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

exports.getChannelsList = function (offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    var getMgrOnly = false;
    users.getChannelsList(offset, limit, filter, getMgrOnly, function (err, doc) {
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


exports.getChannelsMgrList = function (offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    var getMgrOnly = true;
    users.getChannelsList(offset, limit, filter, getMgrOnly, function (err, doc) {
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

