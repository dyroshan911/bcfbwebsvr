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
            customers.updateCustomer(data.user_id, data.role, customerId, updateData, function (err, doc) {
                result = doc;
                cb(statusCode, result);
            });
        }
    });
}

function pushscheduleEventNew(user_id, customerObj) {
    var qeryAttr = 'wechat_id role superior true_name';
    users.queryUser(user_id, qeryAttr, function (err, user) {
        if (!err && user && user.wechat_id) {
            var title = '你好，你推荐用户:' + customerObj.name + '贷款金额' + customerObj.apply_amount + '已进件';
            var result = '等待处理';
            var detail = '详情请进入百城主页查看';
            wechatApi.pushscheduleEvent(user.wechat_id, title, result, detail);
        };
        if(!err && user && user.role == 'member') {
            qeryAttr = 'wechat_id';
            users.queryUser(user.superior, qeryAttr, function (err, superiorUsr) {
                if (!err && superiorUsr && superiorUsr.wechat_id) {
                    var title = '你有一个新订单等待处理';
                    var type = '推荐客户';
                    var status = '未处理';
                    var from = user.true_name;
                    var detail = customerObj.name + '--->贷款' +  customerObj.apply_amount;
                    var remark = '请尽快处理';
                    wechatApi.pushIndentEvent(superiorUsr.wechat_id, title, type, status, from, detail, remark);
                }
            });
        }
    });
}