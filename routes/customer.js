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
        apply_amount: req.body.data.apply_amount,
        sex:req.body.data.sex
    };
	//...
    customers.creatCustomer(token, customerObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});


/* create works, */
router.post('/works', function (req, res) {
    var token = req.query.token;
    var customerObj = {
        name: req.body.data.name,
        phone: req.body.data.phone,
        sex:req.body.data.sex,
        apply_amount: 0
    };
    //...
    customers.creatWorks(token, customerObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});


/* create insurance, */
router.post('/insurance', function (req, res) {
    var token = req.query.token;
    var customerObj = {
        name: req.body.data.name,
        phone: req.body.data.phone,
        sex:req.body.data.sex,
        apply_amount: 0
    };
    //...
    customers.creatInsurance(token, customerObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});

/* get customer list*/
router.get('/', function (req, res) {
    var token = req.query.token;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    customers.getCustomerList(token, offset, limit, filter, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
    //httpResp(res, 200, {customerlist:'test get customer'});

});


/* get customer list by id*/
router.get('/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
	//todo get custromer list by id
    //httpResp(res, 200, {customerlist:'test get customer by id'});
    customers.getCustomerListById(token, accountId, offset, limit, filter, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
});

/* update customer info by id*/
router.put('/:customer_id', function (req, res) {
    var token = req.query.token;
    var customerId = req.params.customer_id;
    var dataObj = req.body.data;
	//todo get custromer list by id
    //httpResp(res, 200, {customerlist:'test get customer by id'});
    customers.updateCustomerInfo(token, customerId, dataObj, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
});

module.exports = router;
