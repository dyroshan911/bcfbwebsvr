var express = require('express');
var router = express.Router();
var cases = require('../controllers/cases.js');

/** a common fcuntion to package response */

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}


/* create case, */
router.post('/', function (req, res) {
    var dataObj = req.body.data;
    cases.createCase(dataObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});

/* update case, */
router.put('/:caseId', function (req, res) {
    var dataObj = req.body.data;
    var caseId = req.params.caseId;
    cases.updateCase(caseId, dataObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get case list*/
router.get('/', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    cases.getCasesList(offset, limit, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });

});


/* delete case list by id*/
router.delete('/:case_id', function (req, res) {

    var caseId = req.params.case_id;
    cases.deleteCase(caseId, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });

});

/* update case info by id
router.put('/:customer_id', function (req, res) {
    var token = req.query.token;
    var customerId = req.params.customer_id;
    var dataObj = req.body.data;
	//todo get custromer list by id
    httpResp(res, 200, {customerlist:'test get case by id'});

});*/

module.exports = router;
