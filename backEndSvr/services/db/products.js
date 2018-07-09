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

productObj.createProduct = function (productObj, cb) {
    var productInfo = {
        id: uuid.v4(),
        title: productObj.title,
        type: productObj.type,
        money_min: productObj.money_min,
        money_max: productObj.money_max,
        rate_min: productObj.rate_min,
        rate_max: productObj.rate_max,
        detail: productObj.detail
    }
    var newproduct = new ProductModel(productInfo);
    newproduct.save(function (err, products) {
        cb(err, products);
    });
};

productObj.updateProduct = function (productId, productObj, cb) {
    var productInfo = {
        title: productObj.title,
        type: productObj.type,
        money_min: productObj.money_min,
        money_max: productObj.money_max,
        rate_min: productObj.rate_min,
        rate_max: productObj.rate_max,
        detail: productObj.detail
    }
    ProductModel.update({id:productId},{$set:productInfo},function (err, products) {
        cb(err, products);
    });
};



productObj.deleteProduct = function (productId, cb) {
    ProductModel.remove({ id: productId }, function (err, result) {
        cb(err, result);
    });
};

