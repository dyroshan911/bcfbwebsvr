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
                    complete: doc.complete,
                    phone: doc.phone
                };
                sessions.updateSession(token, userData, function (err, data) {
                    if (err) { console.error('update session error'); }
                });
                delete userData.open_id;
                result = userData;
            } else {
                statusCode = 403;
                result.code = 'e1103';
                if(doc == 'job number error') {
                    result.code = 'e1105';
                }
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
                        complete: doc.complete,
                        phone: doc.phone
                    };
                    sessions.updateSession(token, userData, function (err, data) {
                        if (err) { console.error('update session error'); }
                    });
                    result = { user_id: doc.id };
                } else {
                    statusCode = 403;
                    result.code = 'e1104';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 403;
            result.code = 'e2004';
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
                    result.code = 'e1110';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'Without permission';
            result.source = '<<webui>>';
        }
    });
}


exports.getMembersListById = function (token, accountId, offset, limit, filter, cb) {
    sessions.getSessionAttrs(token, ['role', 'user_id'], function (err, data) {
        var result = {};
        var statusCode = 201;
        if (!err && data.user_id && data.role == 'admin') {
            users.getMembersList(accountId, offset, limit, filter, function (err, doc) {
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
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'Without permission';
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
}


exports.getChannelsList = function (token, offset, limit, filter, cb) {
    sessions.getSessionAttrs(token, ['role', 'user_id'], function (err, data) {
        var result = {};
        var statusCode = 201;
        if (!err && data.user_id && (data.role == 'admin' || data.role == 'channel-mgr')) {
            users.getChannelsList(data.user_id, data.role, offset, limit, filter, function (err, doc) {
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
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'Without permission';
            result.source = '<<webui>>';
        }
    });
}


exports.getAccountInfo = function (token, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id'], function (err, data) {
        if (!err && data) {
            var qeryAttr = 'role superior user_name true_name complete phone';
            users.queryUser(data.user_id, qeryAttr, function (err, user) {
                if (!err) {
                    cb(statusCode, user);
                } else {
                    statusCode = 403;
                    result.code = 'e1110';
                    result.message = 'err.message';
                    result.description = 'err.message';
                    result.source = '<<webui>>';
                    cb(statusCode, result);
                }
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
};


exports.completeAcount = function (token, userName, password, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'complete', 'open_id'], function (err, data) {
        if (!err && data && data.complete == 'false') {
            users.completeAcount(data.user_id, userName, password, function (err, doc) {
                if (!err) {
                    var userData = {
                        user_id: doc.id,
                        user_name: doc.user_name,
                        role: doc.role,
                        superior: doc.superior,
                        true_name: doc.true_name,
                        open_id: data.open_id,
                        complete: doc.complete,
                        phone: doc.phone
                    };
                    sessions.updateSession(token, userData, function (err, data) {
                        if (err) { console.error('update session error'); }
                    });
                    delete userData.open_id;
                    result = userData;
                    cb(statusCode, result);
                } else {
                    statusCode = 403;
                    result.code = 'e1104';
                    result.message = 'err.message';
                    result.description = 'err.message';
                    result.source = '<<webui>>';
                    cb(statusCode, result);
                }
            });
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'no permision';
            result.description = 'no permision';
            result.source = '<<webui-completeAcount>>';
            cb(statusCode, result);
        }
    });
}

exports.updateAccountInfo = function (token, dataObj, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'open_id'], function (err, data) {
        if (!err && data) {
            var updateData = {};
            if (dataObj && dataObj.true_name && dataObj.true_name != '') {
                updateData.true_name = dataObj.true_name;
            }
            if (dataObj && dataObj.password && dataObj.password != '') {
                updateData.password = dataObj.password;
            }
            if (dataObj && dataObj.phone && dataObj.phone != '') {
                updateData.phone = dataObj.phone;
            }
            if (dataObj && dataObj.email && dataObj.email != '') {
                updateData.email = dataObj.email;
            }
            if (dataObj && dataObj.unbind && dataObj.unbind == true) {
                updateData.wechat_id = "";
            }
            users.updateAccountInfo(data.user_id, updateData, function (err, doc) {
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


exports.scheduleJob = function () {
    console.log('begin schedule------->')
    users.clearTodayCount();
}