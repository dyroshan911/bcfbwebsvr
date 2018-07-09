
'use strict';
var sessions = require('../services/cache').Sessions;
var users = require("../services/db").Users;

exports.createSession = function (cb) {
	sessions.createSession(function (err, data) {
		var result = {};
        var statusCode = 200;
		if (!err) {
			result.token = data;
		} else {
            statusCode = 500;
            result.code = 'e1109';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
		}
		cb(statusCode, result);
	});
};

exports.verifyToken = function(token, cb) {
    sessions.verifyToken(token, function(err, valid){
        var result = {};
        var statusCode = 200;
        if (err) {
            statusCode = 403;
            result.code = 'e1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        } else if (!valid) {            
            statusCode = 403;
            result.code = 'e1110';
            result.description = result.message = "verify failed";
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.verifyTokenLogin = function(token, cb) {
    sessions.verifyTokenLogin(token, function(err, valid){
        var result = {};
        var statusCode = 200;
        if (err) {
            statusCode = 403;
            result.code = 'e1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        } else if (!valid) {            
            statusCode = 403;
            result.code = 'e1110';
            result.description = result.message = "verify failed";
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.createUser = function (token, userName, password, cb) {
    users.verifyUser(userName, password, function (err, doc) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            var userData = {
                user_id: doc.id,
                login_flag:'true'
            };
            sessions.updateSession(token, userData, function (err, data) {
                if (!err) {
                    result = 'login success';
                    cb(statusCode, result);
                } else {
                    statusCode = 500;
                    result.code = 'e2001';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                    cb(statusCode, result);
                }
            });
        } else {
            statusCode = 500;
            result.code = 'e1109';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
};

exports.signOut = function (token, cb) {
    sessions.clearSession(token, function(err, data) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            statusCode = 200;
        } else {
            statusCode = 500;
            result.code = 'e1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};