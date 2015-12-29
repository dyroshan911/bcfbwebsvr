'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var customerObj = exports = module.exports = {};

var CustomerSchema = model.CustomerSchema;

customerObj.init = function (ap) {
    customerObj.app = ap;
    customerObj.db = ap.DB;
};

customerObj.createCustomer = function (dataObj, cb) {
    var customerInfo = {
        id: uuid.v4(),
        name:dataObj.name,
        phone:dataObj.phone,
        belong_mem:dataObj.mem_id,
        belong_channel:dataObj.channel_id ,
        apply_amount:dataObj.apply_amount,
        create_on: parseInt(Date.now()/1000) 
    };
    var newCustomer = new CustomerSchema(customerInfo);
    newCustomer.save ( function ( err, customer ){
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