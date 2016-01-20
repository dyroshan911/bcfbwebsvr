'use strict';
var products = require("../services/db").Products;

exports.getProductsList = function (offset, limit, cb) {
    var result = {};
    var statusCode = 200;
    products.getProductsList(offset, limit, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}

exports.createProduct = function (dataObj, cb) {
    var result = {};
    var statusCode = 200;
    products.createProduct(dataObj, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}

exports.deleteProduct = function (productId, cb) {
    var result = {};
    var statusCode = 200;
    products.deleteProduct(productId, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}