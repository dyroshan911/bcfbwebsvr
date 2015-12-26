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


/* create customer, */
router.post('/', function (req, res) {
    //var token = req.body.params.token;
    var customerObj = {
        name: req.body.data.name,
        phone: req.body.data.phone,
        superior: req.body.data.superior,
        referrer_id: body.data.referrer_id,
        apply_amount:body.data.apply_amount
    };
	//todo: verify checkcode
	//...
    users.creatCustomer(customerObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});


module.exports = router;
