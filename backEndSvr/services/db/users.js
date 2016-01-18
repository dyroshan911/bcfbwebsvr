'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var userObj = exports = module.exports = {};

var UserModel = model.AccountModel;
var AdminModel = model.AdminModel;

userObj.init = function (ap) {
    userObj.app = ap;
    userObj.db = ap.DB;
};

/**
* Users operations
*/

userObj.verifyUser = function (userName, password, cb) {
    AdminModel.findOne({
        'user_name': userName,
        'password': password
    }).exec(function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error('Verify user failed'), null);
        } else {
            cb(null, user);
        }
    });
};

userObj.queryUser = function (userName, cb) {
    AdminModel.findOne({
        'user_name': userName
    }).select('id').exec(function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error("User not found"), null);
        } else {
            cb(null, user);
        }
    });
};

userObj.getChannelsList = function (offset, limit, filter, getMgrOnly, cb) {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    if (!filter) filter = '';
    var textArr = filter.split(' ');
    var count = textArr.length;
    var queryObj = {};
    if (count !== 0) {
        queryObj['$and'] = [];
        for (var i = 0; i < count; ++i) {
            var queryElem = { '$or': [] };
            queryElem['$or'].push({ true_name: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ phone: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ job_number: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ email: new RegExp(textArr[i], 'i') });

            queryObj['$and'].push(queryElem);
        }
    }
    var queryElem = { '$or': [] };
    if(getMgrOnly == false) {
        queryElem['$or'].push({ role: 'channel' });
    }
    queryElem['$or'].push({ role: 'channel-mgr' });
    queryObj['$and'].push(queryElem);

    UserModel.find(queryObj)
        .sort({ create_on: -1 })
        .skip(offset).
        limit(limit).
        select('user_name create_on email id job_number phone role superior  true_name').
        exec(function (err, channels) {
            if (err) {
                cb(err, null);
            } else if (!channels) {
                cb(new Error("not found"), null);
            } else {
                UserModel.count(queryObj, function (errcount, count) {
                    if (errcount) {
                        cb(errcount, null);
                    }
                    else {
                        var dataList = {};
                        dataList.channelsList = channels;
                        dataList.total = count;
                        cb(null, dataList);
                    }
                });
            }
        });
}

userObj.createUser = function (userObj, cb) {
    var role = 'member';
    if (userObj.role == "channel" || userObj.role == "channel-mgr") {
        role = userObj.role;
    }
    var userInfo = {
        id: uuid.v4(),
        user_name: userObj.user_name,
        password: userObj.user_name + '123456',
        email: userObj.email,
        phone: userObj.phone,
        true_name: userObj.true_name,
        superior: userObj.superior,
        role : role,
        create_on: parseInt(Date.now() / 1000)
    };

    UserModel.findOne({
        user_name: userInfo.user_name
    }, function (err, user) {
        if (!err && !user) {
            AdminModel.findOne({
                user_name: 'admin'
            }, function (err, admin) {
                if (admin) {
                    userInfo.job_number = 'cd' + pad(++admin.channelCount, 4);
                    var newUser = new UserModel(userInfo);
                    newUser.save(function (err, user) {
                        cb(err, user);
                        admin.save(function (err, user) { });
                    });
                }
                else {
                    cb(new Error("admin acount error"), 'job number error');
                }
            });
        } else {
            cb(new Error("already existing"), null);
        }
    });
};

userObj.updateAccountInfo = function (userId, dataObj, cb) {
    UserModel.update({ id: userId }, { $set: dataObj }, function (err, data) {
        cb(err, data);
    });
};


function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}  