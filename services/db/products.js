'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var productObj = exports = module.exports = {};

var ProductModel = model.ProductModel;

productObj.init = function (ap) {
    productObj.app = ap;
    productObj.db = ap.DB;
};

productObj.getProductsList = function (offset, limit, cb) {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    ProductModel.find({})
        .sort({ create_on: -1 })
        .skip(offset).
        limit(limit).
        exec(function (err, products) {
            if (err) {
                cb(err, null);
            } else {
                ProductModel.count({}, function (errcount, count) {
                    if (errcount) {
                        cb(errcount, null);
                    }
                    else {
                        var dataList = {};
                        dataList.productsList = products;
                        dataList.total = count;
                        cb(null, dataList);
                    }
                });
            }
        });
}