'use strict';
var cases = require("../services/db").Cases;

exports.getCasesList = function (offset, limit, cb) {
    var result = {};
    var statusCode = 200;
    cases.getCasesList(offset, limit, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}


exports.createCase = function (dataObj, cb) {
    var result = {};
    var statusCode = 200;
    cases.createCase(dataObj, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}

exports.deleteCase = function (caseId, cb) {
    var result = {};
    var statusCode = 200;
    cases.deleteCase(caseId, function (err, doc) {
        result = doc;
        cb(statusCode, result);
    });
}