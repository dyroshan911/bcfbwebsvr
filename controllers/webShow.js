'use strict';
var cases = require("../services/db").Cases;
var products = require("../services/db").Products;

exports.getCasesList = function (offset, limit, cb) {
    var result = {};
    var statusCode = 200;
    cases.getCasesList(offset, limit, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}

exports.getProductsList = function (offset, limit, cb) {
    var result = {};
    var statusCode = 200;
    products.getProductsList(offset, limit, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}