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
        'password': password
    }).select('id user_name role').exec(function (err, user) {
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
    }).select('id user_name role').exec(function (err, user) {
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
        'password': password
    }, function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error("User not found"), null);
        } else {
            user.wechat_id = openId;
            user.modify_on = parseInt(Date.now()/1000);
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



userObj.queryUser = function(userName, cb) {
    UserModel.findOne({
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

userObj.createUser = function (userObj, cb) {
    var userInfo = {
        id: uuid.v4(),
        user_name:userObj.userName,
        password:userObj.password,
        email:userObj.email,
        phone:userObj.phone,
        true_name:userObj.true_name ,
        superior:userObj.superior,
        wechat_id:userObj.openId,
        create_on: parseInt(Date.now()/1000) 
    };
    if(!userInfo.user_name || userInfo.user_name ==''){
        userInfo.user_name = uuid.v4();
    }
    if(!userInfo.password || userInfo.password ==''){
        userInfo.password = uuid.v4();
    }
    var newUser = new UserModel(userInfo);
    newUser.save ( function ( err, user ){
        if (err) {
            cb(err, null);
        } else {
            var result = {
                id: user.id
            };
            cb(null, result);
        }
    });
};

userObj.updateUser = function (userId, userObj, cb) {
    UserModel.findOne({
        'id': userId
    }, function (err, user) {
        if (err) {
            cb(err, null);
        } else if (!user) {
            cb(new Error("User not found"), null);
        } else {
            for (var key in userObj) {
                if (key === 'password') {
                    user.password = userObj.password;
                }
                if (key === 'nick_name') {
                    user.nick_name = userObj.nick_name;
                }
                //todo: add other attrs here
                //...
                user.modify_on = Date.now();
            }
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

userObj.getUserInfo = function (userId, cb) {
    var acId = userId;
    UserModel.findOne({id: acId})
    .select('id user_name nick_name create_on modify_on enabled')
    .exec(function (err, user) {
        if (err) {
            cb(err, null)
        } else if (!user) {
            cb(new Error("Can not find user by user id " + acId), null);
        } else {
            cb(null, user);
        }
    });
};


/**
* get user list
*   
*/
userObj.getUserList = function (offset, limit, cb) {
    UserModel.find()
    .skip(offset)
    .limit(limit)
    .select('id user_name nick_name create_on modify_on enabled')
    .exec(function(err, users) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, users);
        }
    });
};