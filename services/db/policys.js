//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var policyObj = exports = module.exports = {};

var PolicyModel = model.PolicyModel;

policyObj.init = function (ap) {
    policyObj.app = ap;
    policyObj.db = ap.DB;
};
             
policyObj.createPolicy = function (dataObj, cb) {
    var policyInfo = {
        id: uuid.v4(),
        payer_name: dataObj.payer_name,
        insurer_name: dataObj.insurer_name,
        effective_time: dataObj.effective_time,
        insurance_types: dataObj.insurance_types,
        insurance_company: dataObj.insurance_company,
        payment_frequency: dataObj.payment_frequency, 
        payment_time: dataObj.payment_time,
        insurance_time: dataObj.insurance_time,
        insurance_amount: dataObj.insurance_amount,
        payment_year: dataObj.payment_year,
        belong_mem: dataObj.belong_mem,
        belong_channel: dataObj.belong_channel,
        comment:dataObj.comment,
        belong_name:dataObj.belong_name,             
        belong_tel:dataObj.belong_tel, 
        create_on: parseInt(Date.now() / 1000)
    };
    var newPolicy = new PolicyModel(policyInfo);
    newPolicy.save(function (err, policy) {
        if (err) {
            cb(err, null);
        } else {
            var result = {
                id: policy.id
            };
            cb(null, result);
        }
    });
};


policyObj.getPolicyList = function (user_id, role, offset, limit, filter, cb) {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    if (!filter) filter = '';
    var textArr = filter.split(',');
    console.log(filter)
    console.log(textArr)
    var count = textArr.length;
    var queryObj = {};
    if (count !== 0) {
        console.log('filter----->', textArr);
        queryObj['$and'] = [];
        for (var i = 0; i < count; ++i) {
            var queryElem = { '$or': [] };
            queryElem['$or'].push({ insurance_company: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ payer_name: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ insurer_name: new RegExp(textArr[i], 'i') });
            queryObj['$and'].push(queryElem);
        }
    }
    if (role == 'admin') {

    } else if (role == 'member') {
        queryObj['$and'].push({ belong_mem: user_id });
    } else if (role == 'channel-mgr' || role == 'channel') {
        queryObj['$and'].push({ belong_channel: user_id });
    } else {
        cb(new Error("not permision"), null);
        return;
    }

    var selectattr = 'id payer_name insurer_name  effective_time insurance_types insurance_company payment_frequency payment_time insurance_time insurance_amount payment_year comment belong_mem belong_channel belong_name belong_tel';

    PolicyModel.find(queryObj)
        .sort({ create_on: -1 })
        .skip(offset).
        limit(limit).
        select(selectattr).
        exec(function (err, policys) {
            if (err) {
                cb(err, null);
            } else if (!policys) {
                cb(new Error("not found"), null);
            } else {
                PolicyModel.count(queryObj, function (errcount, count) {
                    if (errcount) {
                        cb(errcount, null);
                    }
                    else {
                        var dataList = {};
                        dataList.policysList = policys;
                        dataList.total = count;
                        cb(null, dataList);
                    }
                });
            }
        });
}


policyObj.updatePolicy = function (userId, role, policyId, dataObj, cb) {
    var queryObj = { 'id': policyId };
    if (role == null) {
        cb(new Error("not permision"), "not permision");
    }

    PolicyModel.update(queryObj, { $set: dataObj }, function (err, data) {
        cb(err, data);
    });
}

policyObj.removePolicy = function (userId, role, policyId, cb) {
    if (role == null) {
        cb(new Error("not permision"), "not permision");
    }
    var conditions = {'id': policyId};
    PolicyModel.remove(conditions, function(err, data){
        cb(err, data);
    })
}