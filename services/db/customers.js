'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var customerObj = exports = module.exports = {};

var CustomerModel = model.CustomerModel;

customerObj.init = function (ap) {
    customerObj.app = ap;
    customerObj.db = ap.DB;
};

customerObj.createCustomer = function (dataObj, cb) {
    var customerInfo = {
        id: uuid.v4(),
        name: dataObj.name,
        phone: dataObj.phone,
        belong_mem: dataObj.mem_id,
        belong_channel: dataObj.channel_id,
        apply_amount: dataObj.apply_amount,
        sex:dataObj.sex,
        create_on: parseInt(Date.now() / 1000)
    };
    var newCustomer = new CustomerModel(customerInfo);
    newCustomer.save(function (err, customer) {
        if (err) {
            cb(err, null);
        } else {
            var result = {
                id: customer.id
            };
            cb(null, result);
        }
    });
};

customerObj.getCustomerList = function (user_id, role, offset, limit, filter, seeTel, cb) {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    if (!filter) filter = '';
    var textArr = filter.split(' ');
    var count = textArr.length;
    var queryObj = {};
    if (count !== 0) {
        console.log('filter----->', textArr);
        queryObj['$and'] = [];
        for (var i = 0; i < count; ++i) {
            var queryElem = { '$or': [] };
            queryElem['$or'].push({ name: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ phone: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ status: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ territory: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ comment: new RegExp(textArr[i], 'i') });
            queryObj['$and'].push(queryElem);
        }
    }
    if (role == 'admin') {

    } else if (role == 'member') {
        queryObj['$and'].push({ belong_mem: user_id });
    } else if (role == 'channel-mgr' || role == 'channel') {
        queryObj['$and'].push({ belong_channel: user_id });
    } else {
        cb(new Error("not permision"), null);
        return;
    }

    var selectattr = 'id name sex  apply_amount finished_amount finished_date billing_date server_rate comment status create_on modify_on';
    if (seeTel) {
        var selectattr = 'id name sex phone  apply_amount finished_amount finished_date billing_date server_rate comment status create_on modify_on';
    }
    CustomerModel.find(queryObj)
        .sort({ create_on: -1 })
        .skip(offset).
        limit(limit).
        select(selectattr).
        exec(function (err, customers) {
            if (err) {
                cb(err, null);
            } else if (!customers) {
                cb(new Error("not found"), null);
            } else {
                CustomerModel.count(queryObj, function (errcount, count) {
                    if (errcount) {
                        cb(errcount, null);
                    }
                    else {
                        var dataList = {};
                        dataList.customerList = customers;
                        dataList.total = count;
                        cb(null, dataList);
                    }
                });
            }
        });
}


customerObj.updateCustomer = function (userId, role, customerId, dataObj, cb) {
    var queryObj = {};
    if (role == 'member') {
        cb(new Error("not permision"), "not permision");
        return;
    } else if (role == 'admin') {
        queryObj = { 'id': customerId };
    } else {
        queryObj = {
            'id': customerId,
            'belong_channel': userId
        };
    }
    CustomerModel.findOne(queryObj, function (err, user) {
        if (!err && user) {
            if(dataObj.phone) {
                dataObj.phone = user.phone + ',' + dataObj.phone;
            }
            var sendMsg = false;
            var customer,status = '';
            if  (dataObj.status != user.status && user.belong_mem != '') {
                sendMsg = true;
                status = (dataObj.status == 'handled') ? '正在处理':'处理完成';
                customer = user;
            }
            CustomerModel.update(queryObj, { $set: dataObj }, function (err, data) {
                data.sendMsg = sendMsg;
                data.status = status;
                data.customer = customer;
                cb(err, data);
            });
        } else {
            cb(err, user);
        }
    });
}