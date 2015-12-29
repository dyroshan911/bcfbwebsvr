'use strict';
var customers = require("../services/db").Customers;
var sessions = require('../services/cache').Sessions;
var users = require("../services/db").Users;


exports.creatCustomer = function (token, customerObj, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            if (data.role = 'member') {
                customerObj.mem_id = data.user_id;
                customerObj.channel_id = data.superior;
            } else {
                customerObj.channel_id = data.user_id;
            }
        }
        customers.createCustomer(customerObj, function (err, data) {
            if (!err) {
                result = data;
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

