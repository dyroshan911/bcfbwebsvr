'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var caseObj = exports = module.exports = {};

var CaseModel = model.CaseModel;

caseObj.init = function (ap) {
    caseObj.app = ap;
    caseObj.db = ap.DB;
};

