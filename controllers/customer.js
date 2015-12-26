'use strict';
var users = require("../services/db").Users;

exports.creatCustomer = function(customerObj, cb) {
   /* users.createUser(accountObj, function (err, doc) {
        var result = {};
        var statusCode = 201;
        if (!err) {
            result = {user_id: doc.id};
        } else {
            statusCode = 403;
            result.code = 'e1109';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });*/
};

