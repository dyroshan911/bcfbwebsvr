'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var userObj = exports = module.exports = {};

var UserModel = model.AccountModel;

userObj.init = function (ap) {
    userObj.app = ap;
    userObj.db = ap.DB;
};

/**
* Users operations
*/

userObj.verifyUser = function (userName, password, cb) {
    UserModel.findOne({
        'user_name': userName,
        'password': password,
        'enabled':true
    }).select('id user_name true_name superior role complete phone').exec(function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error('Verify user failed'), null);
        } else {
            cb(null, user);
        }
    });
};

userObj.verifyUserByOpenid = function (openId, cb) {
    UserModel.findOne({
        'wechat_id': openId,
        'enabled':true
    }).select('id user_name true_name role superior complete phone').exec(function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error('Verify user failed'), null);
        } else {
            cb(null, user);
        }
    });
};

userObj.bindUsrByOpenid = function (openId, userName, password, cb) {
    UserModel.findOne({
        'user_name': userName,
        'password': password,
        'enabled':true
    }, function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error("User not found"), null);
        } else if (user.wechat_id != '' ) {
            cb(new Error("this account has bind other wechat"), null);
        } else {
            user.wechat_id = openId;
            user.modify_on = parseInt(Date.now() / 1000);
            user.save(function (err, result) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, user);
                }
            });
        }
    });
};


userObj.increaseCustomer = function (userId) {
    UserModel.update({ id: userId }, { $inc: { total_customers: 1, today_customers: 1 } }, function (err) {
        if (err) {
            console.error(err);
        }
    });
};

userObj.clearTodayCount = function () {
    UserModel.update({}, { today_customers: 0 }, { multi: true }, function (err) {
        if (err) {
            console.error(err);
        }
    });
};



userObj.queryUser = function (user_id, queryAttr, cb) {
    UserModel.findOne({
        'id': user_id
    }).select(queryAttr).exec(function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error("User not found"), null);
        } else {
            cb(null, user);
        }
    });
};

userObj.createUser = function (userObj, cb) {
    var userInfo = {
        id: uuid.v4(),
        user_name: userObj.userName,
        password: userObj.password,
        email: userObj.email,
        phone: userObj.phone,
        true_name: userObj.true_name,
        superior: userObj.superior,
        wechat_id: userObj.openId,
        create_on: parseInt(Date.now() / 1000)
    };
    if (!userInfo.user_name || userInfo.user_name == '') {
        userInfo.user_name = uuid.v4();
        userInfo.complete = false;
    }
    if (!userInfo.password || userInfo.password == '') {
        userInfo.password = uuid.v4();
        userInfo.complete = false;
    }

    UserModel.findOne({
        user_name: userInfo.user_name
    }, function (err, user) {
        if (!err && !user) {
            UserModel.findOne({
                job_number: userObj.superior
            }, function (err, user) {
                if (user) {
                    userInfo.superior = user.id;
                    var newUser = new UserModel(userInfo);
                    newUser.save(function (err, user) {
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, user);
                        }
                    });
                }
                else {
                    cb(new Error("superior not found"), 'job number error');
                }
            });
        } else {
            cb(new Error("already existing"), null);
        }
    });

};

userObj.getMembersList = function (user_id, offset, limit, filter, cb) {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    if (!filter) filter = '';
    var textArr = filter.split(' ');
    var count = textArr.length;
    var queryObj = {};
    if (count !== 0) {
        console.log('filter----->', textArr);
        queryObj['$and'] = [];
        for (var i = 0; i < count; ++i) {
            var queryElem = { '$or': [] };
            queryElem['$or'].push({ true_name: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ phone: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ territory: new RegExp(textArr[i], 'i') });
            queryObj['$and'].push(queryElem);
        }
    }
    queryObj['$and'].push({ superior: user_id });
    queryObj['$and'].push({ role: 'member' });

    UserModel.find(queryObj)
        .sort({ create_on: -1 })
        .skip(offset).
        limit(limit).
        select('create_on email id job_number phone role superior today_customers total_customers true_name').
        exec(function (err, members) {
            if (err) {
                cb(err, null);
            } else if (!members) {
                cb(new Error("not found"), null);
            } else {
                UserModel.count(queryObj, function (errcount, count) {
                    if (errcount) {
                        cb(errcount, null);
                    }
                    else {
                        var dataList = {};
                        dataList.membersList = members;
                        dataList.total = count;
                        cb(null, dataList);
                    }
                });
            }
        });
}



userObj.getChannelsList = function (user_id, role, offset, limit, filter, cb) {
    if (!offset) offset = 0;
    if (!limit) limit = 30;
    if (!filter) filter = '';
    var textArr = filter.split(' ');
    var count = textArr.length;
    var queryObj = {};
    if (count !== 0) {
        console.log('filter----->', textArr);
        queryObj['$and'] = [];
        for (var i = 0; i < count; ++i) {
            var queryElem = { '$or': [] };
            queryElem['$or'].push({true_name: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ phone: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ job_number: new RegExp(textArr[i], 'i') });
            queryElem['$or'].push({ email: new RegExp(textArr[i], 'i') });

            queryObj['$and'].push(queryElem);
        }
    }
    if (role == 'admin') {
        var queryElem = { '$or': [] };
        queryElem['$or'].push({ role: 'channel' });
        queryElem['$or'].push({ role: 'channel-mgr' });
        queryObj['$and'].push(queryElem);
    } else {
        queryObj['$and'].push({ superior: user_id });
        queryObj['$and'].push({ role: 'channel' });
    }


    UserModel.find(queryObj)
        .sort({ create_on: -1 })
        .skip(offset).
        limit(limit).
        select('create_on email id job_number phone role superior today_customers total_customers true_name').
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

userObj.completeAcount = function (userId, userName, password, cb) {
    UserModel.findOne({
        user_name: userName
    }, function (err, user) {
        if (!err && !user) {
            UserModel.update({ id: userId }, { $set: { user_name: userName, password: password, complete: true } }, function (err, data) {
                cb(err, data);
            });
        } else {
            cb(new Error('user name has exisit'), null);
        }
    })
}

userObj.getRandomChannel = function (cb) {
    var queryObj = {};
    queryObj['$and'] = [];
    var queryElem = { '$or': [] };
    queryElem['$or'].push({ role: 'channel' });
    queryElem['$or'].push({ role: 'channel-mgr' });
    queryObj['$and'].push(queryElem);
    UserModel.find(queryObj, function (err, user) {
        if (!err && user) {
            cb(null, user[parseInt(Math.random()*user.length)]);
        } else {
            cb(new Error('not find any'), null);
        }
    })
}


userObj.updateAccountInfo = function (userId, dataObj, cb) {
    UserModel.update({ id: userId }, { $set: dataObj }, function (err, data) {
        cb(err, data);
    });
};

