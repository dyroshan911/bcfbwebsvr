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
    httpResp(res, 200, { customerlist: 'test get all account list' });
    /*users.getAccounts(token, obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/
});

/* bind user with wechat_id, user sign up. */
router.put('/', function (req, res) {
    var token = req.query.token;
    var accountObj = {
        userName: req.body.data.user_name,
        password: req.body.data.password,
    };
    //todo: verify checkcode
    //...
    users.bindAccount(token, accountObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});



/* create user, user sign up. */
router.post('/', function (req, res) {
    var token = req.query.token;
    var accountObj = {
        userName: req.body.data.user_name,
        password: req.body.data.password,
        email: req.body.data.email,
        phone: req.body.data.phone,
        true_name: req.body.data.true_name,
        superior: req.body.data.superior
    };
    //todo: verify checkcode
    //...
    users.creatAccount(token, accountObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});

/* get all my member user accounts info  */
router.get('/member', function (req, res) {

    var token = req.query.token;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    users.getMembersList(token, offset, limit, filter, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});

/* get all member user accounts info  by chanel id*/
router.get('/member/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;

    users.getMembersListById(token, accountId, offset, limit, filter, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get all my channel user accounts info  */
router.get('/channel', function (req, res) {
    var token = req.query.token;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    //todo: get all account list
    users.getChannelsList(token, offset, limit, filter, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get  account info */
router.get('/accountInfo', function (req, res) {
    var token = req.query.token;

    users.getAccountInfo(token, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* complete account info */
router.put('/completeAcount', function (req, res) {
    var token = req.query.token;
    var userName = req.body.data.user_name;
    var password = req.body.data.password;
    users.completeAcount(token, userName, password, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* update account info */
router.put('/accountInfo', function (req, res) {
    var token = req.query.token;
    var dataObj = req.body.data;
    users.updateAccountInfo(token, dataObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});



/* update account info */
router.put('/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;
    var updateData = req.body.data;
    //todo: verify checkcode
    //...
    //todo:update account info
    //httpResp(res, 200, { customerlist: 'update account info' });
    users.updateAccountById(accountId, updateData, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get all memberinfo by  id*/
router.get('/memberinfo/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;

    users.getMemberInfoById(token, accountId, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});

module.exports = router;
