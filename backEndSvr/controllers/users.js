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


exports.updateAccountInfo = function (accountId, dataObj, cb) {
    var result = {};
    var statusCode = 200;
    var updateData = {};
    if (dataObj && dataObj.true_name && dataObj.true_name != '') {
        updateData.true_name = dataObj.true_name;
    }
    if (dataObj && dataObj.phone) {
        updateData.phone = dataObj.phone;
    }
    if (dataObj && dataObj.email) {
        updateData.email = dataObj.email;
    }
    if (dataObj && dataObj.superior) {
        updateData.superior = dataObj.superior;
    }
    if (dataObj && (dataObj.role == 'channel-mgr' || dataObj.role == 'channel')) {
        updateData.role = dataObj.role;
        if (updateData.role == 'channel-mgr') {
            updateData.superior = '';
        }
    }
    if (dataObj && dataObj.enable) {
        updateData.enable = dataObj.enable;
        if(dataObj.enable == false)
            updateData.wechat_id = '';
    }
    users.updateAccountInfo(accountId, updateData, function (err, doc) {
        if (!err) {
            result = doc;
            cb(statusCode, result);
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

