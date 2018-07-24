'use strict';
var policys = require("../services/db").Policys;
var sessions = require('../services/cache').Sessions;
var users = require("../services/db").Users;
var wechatApi = require("../services/wechat/wechatApi")


exports.creatPolicy = function (token, policyObj, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role', 'superior'], function (err, data) {
        if (!err && data.user_id) {
            if (data.role == 'member') {
                policyObj.belong_mem = data.user_id;
                policyObj.belong_channel = data.superior;
            } else {
                policyObj.belong_channel = data.user_id;
            }
            policys.createPolicy(policyObj, function (err, policy) {
                if (!err) {
                    result = policy;
                    cb(statusCode, result);
                } else {
                    statusCode = 500;
                    result.code = 'e0001';
                    result.message = err.message;
                    result.description = 'creatPolicy';
                    result.source = '<<webui>>';
                }
            });
        } else {
                policyObj.channel_id = "af7687de-5c04-47f5-ab7b-31e9417e47c8";

                policys.createPolicy(policyObj, function (err, policy) {
                    if (!err) {
                        result = policy;
                        cb(statusCode, result);
                    } else {
                        statusCode = 500;
                        result.code = 'e0001';
                        result.message = err.message;
                        result.description = 'creatPolicy';
                        result.source = '<<webui>>';
                    }
                });
        }

    });
};


exports.getPolicyList = function (token, offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            policys.getPolicyList(data.user_id, data.role, offset, limit, filter, function (err, doc) {
                result = doc;
                cb(statusCode, result);
            });
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'err.message';
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
}

exports.getPolicyAnalysis = function (token, cb) {
    var result = {
        annual_payment:{
            list:[],
            total_count:0,
            total_amout:0
        },
        severe_disease:[],
        death_insurance:[],
        accidental_guarantee:[],
        hospitalization:[],
        personal:{
            list:[],
            total_count:0,
            total_amout:0
        },
        company:{
            list:[],
            total_count:0
        }
    };
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            policys.getPolicyList(data.user_id, data.role, 0, -1, null, function (err, doc) {
                //result = doc;
                if (!err && doc && doc.policysList) {
                    var payer_namelist = {};
                    var severe_disease_nameList = {};
                    var death_insurance_nameList = {};
                    var accidental_guarantee_nameList = {};
                    var hospitalization_nameList = {};
                    var personal_nameList = {};
                    var company_nameList = {};
                    
                    for(var i = 0; i < doc.policysList.length; i++) {
                        var policy = doc.policysList[i];
                        
                        ////年缴保费统计
                        if (!payer_namelist[policy.payer_name]) {
                            payer_namelist[policy.payer_name] = {
                                payer_name: policy.payer_name,
                                payment_year : policy.payment_year,
                                count : 1
                            }
                            result.annual_payment.total_count = result.annual_payment.total_count + 1;
                            result.annual_payment.total_amout = result.annual_payment.total_amout + policy.payment_year;
                        } else {
                            payer_namelist[policy.payer_name].payment_year = payer_namelist[policy.payer_name].payment_year + policy.payment_year;
                            payer_namelist[policy.payer_name].count = payer_namelist[policy.payer_name].count + 1;
                            
                            result.annual_payment.total_count = result.annual_payment.total_count + 1;
                            result.annual_payment.total_amout = result.annual_payment.total_amout + policy.payment_year;
                        }
                        
                        //重大疾病保额统计
                        if (policy.insurance_types.indexOf("重大疾病") != -1) {
                            if (!severe_disease_nameList[policy.insurer_name]) {
                                severe_disease_nameList[policy.insurer_name] = {
                                    insurer_name : policy.insurer_name,
                                    amount : policy.payment_year
                                }
                            } else {
                                severe_disease_nameList[policy.insurer_name].amount = severe_disease_nameList[policy.insurer_name].amount + policy.payment_year;
                            }
                            
                        }
                        
                        
                        //身故寿险保额统计
                        if (policy.insurance_types.indexOf("身故寿险") != -1) {
                            if (!death_insurance_nameList[policy.insurer_name]) {
                                death_insurance_nameList[policy.insurer_name] = {
                                    insurer_name : policy.insurer_name,
                                    amount : policy.payment_year
                                }
                            } else {
                                death_insurance_nameList[policy.insurer_name].amount = death_insurance_nameList[policy.insurer_name].amount + policy.payment_year;
                            }
                        }
                        
                        //意外保障保额统计
                        if (policy.insurance_types.indexOf("意外保障") != -1) {
                            if (!accidental_guarantee_nameList[policy.insurer_name]) {
                                accidental_guarantee_nameList[policy.insurer_name] = {
                                    insurer_name : policy.insurer_name,
                                    amount : policy.payment_year
                                }
                            } else {
                                accidental_guarantee_nameList[policy.insurer_name].amount = accidental_guarantee_nameList[policy.insurer_name].amount + policy.payment_year;
                            }
                        }
                        
                        //住院医疗保额统计
                        if (policy.insurance_types.indexOf("住院医疗") != -1) {
                            if (!hospitalization_nameList[policy.insurer_name]) {
                                hospitalization_nameList[policy.insurer_name] = {
                                    insurer_name : policy.insurer_name,
                                    amount : policy.payment_year
                                }
                            } else {
                                hospitalization_nameList[policy.insurer_name].amount = hospitalization_nameList[policy.insurer_name].amount + policy.payment_year;
                            }
                        }
                        
                        
                        //个人保单件数
                        if (!personal_nameList[policy.insurer_name]) {
                            personal_nameList[policy.insurer_name] = {
                                insurer_name: policy.insurer_name,
                                payment_year : policy.payment_year,
                                count : 1
                            }
                            result.personal.total_count = result.personal.total_count + 1;
                            result.personal.total_amout = result.personal.total_amout + policy.payment_year;
                        } else {
                            personal_nameList[policy.insurer_name].payment_year = personal_nameList[policy.insurer_name].payment_year + policy.payment_year;
                            personal_nameList[policy.insurer_name].count = personal_nameList[policy.insurer_name].count + 1;
                            
                            result.personal.total_count = result.personal.total_count + 1;
                            result.personal.total_amout = result.personal.total_amout + policy.payment_year;
                        }
                        
                        
                        //公司保单件数
                        if (!company_nameList[policy.insurance_company]) {
                            company_nameList[policy.insurance_company] = {
                                company_name: policy.insurance_company,
                                count : 1
                            }
                            result.company.total_count = result.company.total_count + 1;
                        } else {
                            company_nameList[policy.insurance_company].count = company_nameList[policy.insurance_company].count + 1;
                            result.company.total_count = result.company.total_count + 1;
                        }
                        
                        
                    }
                    
                    for (key in payer_namelist) {
                        result.annual_payment.list.push(payer_namelist[key]);
                    }
                    
                    for (key in severe_disease_nameList) {
                        result.severe_disease.push(severe_disease_nameList[key]);
                    }
                    
                    for (key in death_insurance_nameList) {
                        result.death_insurance.push(death_insurance_nameList[key]);
                    }
                    
                    for (key in accidental_guarantee_nameList) {
                        result.accidental_guarantee.push(accidental_guarantee_nameList[key]);
                    }
                    
                    for (key in hospitalization_nameList) {
                        result.hospitalization.push(hospitalization_nameList[key]);
                    }
                    
                    for (key in personal_nameList) {
                        result.personal.list.push(personal_nameList[key]);
                    }
                    
                    for (key in company_nameList) {
                        result.company.list.push(company_nameList[key]);
                    }
                };
                cb(statusCode, result);
            });
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'err.message';
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
}


exports.getPolicyListById = function (token, accountId, offset, limit, filter, cb) {
    var result = {};
    var statusCode = 200;
    sessions.getSessionAttrs(token, ['user_id', 'role'], function (err, data) {
        if (!err && data.user_id) {
            if (data.role = 'admin');
            var qeryAttr = 'role superior';
            users.queryUser(accountId, qeryAttr, function (err, user) {
                err;
                policys.getPolicyList(accountId, user.role, offset, limit, filter, function (err, doc) {
                    err;
                    result = doc;
                    cb(statusCode, result);
                });
            });
        } else {
            statusCode = 403;
            result.code = 'e1110';
            result.message = 'err.message';
            result.description = 'err.message';
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
}