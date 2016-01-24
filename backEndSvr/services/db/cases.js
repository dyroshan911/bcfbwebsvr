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

caseObj.getCasesList = function (offset, limit, cb) {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    CaseModel.find({})
        .sort({ create_on: -1 })
        .skip(offset).
        limit(limit).
        exec(function (err, cases) {
            if (err) {
                cb(err, null);
            } else {
                CaseModel.count({}, function (errcount, count) {
                    if (errcount) {
                        cb(errcount, null);
                    }
                    else {
                        var dataList = {};
                        dataList.casesList = cases;
                        dataList.total = count;
                        cb(null, dataList);
                    }
                });
            }
        });
}


caseObj.createCase = function (caseObj, cb) {
    var caseInfo = {
        id: uuid.v4(),
        name: caseObj.name,
        type:caseObj.type,
        amount:  caseObj.amount,
        time_limit: caseObj.time_limit,
        rate: caseObj.rate,
        date: caseObj.date,
        detail: caseObj.detail
    }
    var newCase = new CaseModel(caseInfo);
    newCase.save(function (err, cases) {
        cb(err, cases);
    });
};


caseObj.deleteCase = function (caseId, cb) {
    CaseModel.remove({id:caseId},function(err, result){
        cb(err, result);
    });
};


