'use strict';
var customers = require("../services/db").Customers;
var sessions = require('../services/cache').Sessions;
var users = require("../services/db").Users;
var wechatApi = require("../services/wechat/wechatApi")


exports.creatCustomer = function (token, customerObj, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role', 'superior'], function (err, data) {
        if (!err && data.user_id) {
            if (data.role == 'member') {
                customerObj.mem_id = data.user_id;
                customerObj.channel_id = data.superior;
                users.increaseCustomer(data.user_id);
                users.increaseCustomer(data.superior);
            } else {
                customerObj.channel_id = data.user_id;
                users.increaseCustomer(data.user_id);
            }
            customers.createCustomer(customerObj, function (err, customer) {
                if (!err) {
                    result = customer;
                    pushscheduleEventNew(data.user_id, customerObj);
                    cb(statusCode, result);
                } else {
                    statusCode = 500;
                    result.code = 'e0001';
                    result.message = err.message;
                    result.description = 'creatCustomer';
                    result.source = '<<webui>>';
                }
            });
        } else {
            users.getRandomChannel(function (err, user) {
                if (!err) {
                    customerObj.channel_id = user.id;
                    users.increaseCustomer(user.id);
                }
                customers.createCustomer(customerObj, function (err, customer) {
                    if (!err) {
                        result = customer;
                        //pushscheduleEventNew(data.user_id, customerObj);
                        cb(statusCode, result);
                    } else {
                        statusCode = 500;
                        result.code = 'e0001';
                        result.message = err.message;
                        result.description = 'creatCustomer';
                        result.source = '<<webui>>';
                    }
                });
            });
        }

    });
};

exports.getCustomerList = function (token, offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            customers.getCustomerList(data.user_id, data.role, offset, limit, filter, true, function (err, doc) {
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

exports.getCustomerListById = function (token, accountId, offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            var seeTel = false;
            if (data.role = 'admin') seeTel = true;
            var qeryAttr = 'role superior';
            users.queryUser(accountId, qeryAttr, function (err, user) {
                if (user.role == 'member' && user.superior == data.user_id) {
                    seeTel = true;
                }
                customers.getCustomerList(accountId, user.role, offset, limit, filter, seeTel, function (err, doc) {
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

exports.updateCustomerInfo = function (token, customerId, dataObj, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            var updateData = {};
            if (dataObj.comment && dataObj.comment != '') {
                updateData.comment = dataObj.comment;
            }
            if (dataObj.billing_date && dataObj.billing_date != '') {
                updateData.billing_date = dataObj.billing_date;
            }
            if (dataObj.server_rate && dataObj.server_rate != '') {
                updateData.server_rate = dataObj.server_rate;
            }
            if (dataObj.status && dataObj.status != '') {
                updateData.status = dataObj.status;
            }
            if (dataObj.phone && dataObj.phone != '') {
                updateData.phone = dataObj.phone;
            }
            if (dataObj.sex && dataObj.sex != '') {
                updateData.sex = dataObj.sex;
            }
            if (dataObj.finished_amount && dataObj.finished_amount != '') {
                updateData.finished_amount = dataObj.finished_amount;
            }
            customers.updateCustomer(data.user_id, data.role, customerId, updateData, function (err, doc) {
                if (doc.sendMsg) {
                    pushscheduleEventUpdate(doc.customer.belong_mem, doc.customer, doc.status);
                }
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

function pushscheduleEventNew(user_id, customerObj) {
    var qeryAttr = 'wechat_id role superior true_name phone';
    var sex = (customerObj.sex == 'male') ? ' 先生' : ' 女士';
    users.queryUser(user_id, qeryAttr, function (err, user) {
        if (!err && user && user.role == 'member') {
            qeryAttr = 'true_name phone wechat_id';
            users.queryUser(user.superior, qeryAttr, function (err, superiorUsr) {
                if (!err && superiorUsr) {                    
                    var title = '你好，您提交的' + customerObj.name + sex + '贷款订单处理进度通知';
                    var handleBy = superiorUsr.true_name;
                    var phone = superiorUsr.phone;
                    var result = '已进件，等待处理';
                    var detail = '详情请查看在百城主页中查看，如有疑问请拨打处理人电话,\n点击此消息可以进入拨打处理人电话页面';
                    wechatApi.pushscheduleEvent(user.wechat_id, title, handleBy, phone, result, detail);
                    
                    var title2 = '你好，你有一个贷款订单进件\n';
                    title2 = title2 + '贷款人: '  + customerObj.name  + sex + '\n';
                    title2 = title2 + '贷款金额:' +  customerObj.apply_amount + '\n';
                    title2 = title2 + '联系电话:' + customerObj.phone;
                    var handleBy2 = '来自会员：' + user.true_name;
                    var phone2 =  user.phone;
                    var result2 =  '已进件，等待处理';
                    var detail2 = '详情进入百城主页查看，请尽快处理\n点击此消息可以进入拨打客户电话页面';
                    wechatApi.pushscheduleEvent(superiorUsr.wechat_id, title2, handleBy2, phone2, result2, detail2);
                }
            });
        }
    });
}


function pushscheduleEventUpdate(user_id, customerObj, status) {
    var qeryAttr = 'wechat_id role superior true_name phone';
    var sex = (customerObj.sex == 'male') ? ' 先生' : ' 女士';
    users.queryUser(user_id, qeryAttr, function (err, user) {
        if (!err && user && user.wechat_id != '') {
            qeryAttr = 'true_name phone';
            users.queryUser(user.superior, qeryAttr, function (err, superiorUsr) {
                if (!err && superiorUsr) {
                    var title = '你好，您提交的' + customerObj.name + sex + '贷款订单处理进度通知';
                    var handleBy = superiorUsr.true_name;
                    var phone = superiorUsr.phone;
                    var result = status;
                    var detail = '详情请查看在百城主页中查看，如有疑问请拨打处理人电话';
                    wechatApi.pushscheduleEvent(user.wechat_id, title, handleBy, phone, result, detail);
                }                    
            });
        }
    });
}