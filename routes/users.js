var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/** a common fcuntion to package response */

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}



/* get all user accounts info  */
router.get('/', function (req, res) {
    var token = req.query.token;
    var obj = {
        offset: req.query.offset,
        limit: req.query.limit
    };
    //todo: get all account list
    httpResp(res, 200, {customerlist:'test get all account list'});
    /*users.getAccounts(token, obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/ 
});

/* create user, user sign up. */
router.post('/', function (req, res) {
    //var token = req.body.params.token;
    var accountObj = {
        userName: req.body.data.user_name,
        password: req.body.data.password,
        email: req.body.data.email,
        phone: req.body.data.phone,
        true_name : req.body.data.true_name,
        superior: req.body.data.superior
    };
	//todo: verify checkcode
	//...
    users.creatAccount(accountObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});

/* get all my member user accounts info  */
router.get('/member', function (req, res) {
    var token = req.query.token;
    var obj = {
        offset: req.query.offset,
        limit: req.query.limit
    };
    //todo: get all account list
    httpResp(res, 200, {customerlist:'test get all my member account list'});
    /*users.getAccounts(token, obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/ 
});

/* get all member user accounts info  by chanel id*/
router.get('/member/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;
    var obj = {
        offset: req.query.offset,
        limit: req.query.limit
    };
    //todo: get all account list
    httpResp(res, 200, {customerlist:'test get all member account list by chanel id'});
    /*users.getAccounts(token, obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/ 
});


/* get all my channel user accounts info  */
router.get('/channel', function (req, res) {
    var token = req.query.token;
    var obj = {
        offset: req.query.offset,
        limit: req.query.limit
    };
    //todo: get all account list
    httpResp(res, 200, {customerlist:'test get all my channel account list'});
    /*users.getAccounts(token, obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/ 
});



/* update account info */
router.put('/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;
    var updateData = req.body.data;
	//todo: verify checkcode
	//...
    //todo:update account info
    httpResp(res, 200, {customerlist:'update account info'});
    /*users.getAccounts(token, obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/ 
});













/* get account info  by id*/
router.get('/:accountId', function (req, res) {
    var token = req.query.token;
    var accountId = req.url.substring(1, req.url.indexOf('?'));
    users.getAccountInfo(token, accountId, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});

/* update account info by id*/
router.put('/:accountId', function (req, res) {
    
    var token = req.query.token;
    var accountId = req.url.substring(1, req.url.indexOf('?'));
    var accountObj = {};
    if (req.body.data.nick_name) {
        accountObj.nickName = req.body.data.nick_name;
    }
    if (req.body.data.password) {
        accountObj.password = req.body.data.password;
    }
    if (req.body.data.enable) {
        accountObj.enable = req.body.data.enable;
    }
    users.updateAccount(token, accountId, accountObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});

/* add role for account info by id*/
router.post('/:accountId/roles', function (req, res) {

    var accountId = req.url.substring(1, req.url.indexOf('/roles'));
    /*var token = req.query.token;
    

    users.getAccounts(obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/
});

/* update role for account info by id*/
router.put('/:accountId/roles', function (req, res) {
    var accountId = req.url.substring(1, req.url.indexOf('/roles'));
    /*var token = req.query.token,

    //todo:
    users.getAccounts(obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); */
});
module.exports = router;
