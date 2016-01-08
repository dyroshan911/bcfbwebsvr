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

