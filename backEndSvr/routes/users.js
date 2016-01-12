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



/* get all my channel user accounts info  */
router.get('/', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    //todo: get all account list
    users.getChannelsList(offset, limit, filter, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* create channel user. */
router.post('/', function (req, res) {
    var accountObj = {
        user_name: req.body.data.user_name,
        email: req.body.data.email,
        phone: req.body.data.phone,
        true_name: req.body.data.true_name,
        role: req.body.data.role,
        superior: req.body.data.superior
    };
    //todo: verify checkcode
    //...
    users.creatAccount(accountObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get all my channel mgrlist user accounts info  */
router.get('/mgr', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    //todo: get all account list
    users.getChannelsMgrList(offset, limit, filter, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});



module.exports = router;
