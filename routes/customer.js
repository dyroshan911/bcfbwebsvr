var express = require('express');
var router = express.Router();
var customers = require('../controllers/customer.js');

/** a common fcuntion to package response */

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}


/* create customer, */
router.post('/', function (req, res) {
    var token = req.query.token;
    var customerObj = {
        name: req.body.data.name,
        phone: req.body.data.phone,
        apply_amount: req.body.data.apply_amount
    };
	//...
    customers.creatCustomer(token, customerObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});


/* get customer list*/
router.get('/', function (req, res) {
    var token = req.query.token;
	//todo get custromer list
    httpResp(res, 200, {customerlist:'test get customer'});
    /*users.creatCustomer(customerObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/ 
});


/* get customer list by id*/
router.get('/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;
	//todo get custromer list by id
    httpResp(res, 200, {customerlist:'test get customer by id'});
    /*users.creatCustomer(customerObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });*/ 
});

module.exports = router;
