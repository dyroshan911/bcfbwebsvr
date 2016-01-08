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
        limit: req.query.limit,
        tenantId: req.query.tenantId
    };
    //todo:
    users.getAccounts(token, obj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
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
module.exports = router;
