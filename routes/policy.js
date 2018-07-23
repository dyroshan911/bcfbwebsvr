var express = require('express');
var router = express.Router();
var policys = require('../controllers/policy.js');

/** a common fcuntion to package response */

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}


router.post('/', function (req, res) {
    var token = req.query.token;
    var policyObj = {
        payer_name: req.body.data.payer_name,
        insurer_name: req.body.data.insurer_name,
        effective_time: req.body.data.effective_time,
        insurance_types: req.body.data.insurance_types,
        insurance_company: req.body.data.insurance_company,
        payment_frequency: req.body.data.payment_frequency, 
        payment_time: req.body.data.payment_time,
        insurance_time: req.body.data.insurance_time,
        insurance_amount: req.body.data.insurance_amount,
        payment_year: req.body.data.payment_year,
        belong_mem: req.body.data.belong_mem,
        belong_channel: req.body.data.belong_channel,
        comment:req.body.data.comment
    };
	//..
    policys.creatPolicy(token, policyObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    }); 
});


/* get policy list*/
router.get('/', function (req, res) {
    var token = req.query.token;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
    policys.getPolicyList(token, offset, limit, filter, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
    //httpResp(res, 200, {customerlist:'test get customer'});

});

/* get policy analysis*/
router.get('/analysis', function (req, res) {
    var token = req.query.token;
    policys.getPolicyAnalysis(token, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
    //httpResp(res, 200, {customerlist:'test get customer'});
});

/* get policy list by id*/
router.get('/:account_id', function (req, res) {
    var token = req.query.token;
    var accountId = req.params.account_id;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;

    policys.getPolicyListById(token, accountId, offset, limit, filter, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
});

module.exports = router;
