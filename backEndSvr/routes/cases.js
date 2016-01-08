var express = require('express');
var router = express.Router();
/** a common fcuntion to package response */

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}


/* create case, */
router.post('/', function (req, res) {
    var token = req.query.token;
    var dataObj = req.body.data;
	//...
    
    httpResp(res, 201, {create:'create case'});
});


/* get case list*/
router.get('/', function (req, res) {
    var token = req.query.token;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;

    httpResp(res, 200, {caselist:'test get case'});

});


/* get case list by id*/
router.get('/:case_id', function (req, res) {
    var token = req.query.token;
    var caseId = req.params.case_id;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
	//todo get custromer list by id
    httpResp(res, 200, {customerlist:'test get case by id'});

});

/* update case info by id*/
router.put('/:customer_id', function (req, res) {
    var token = req.query.token;
    var customerId = req.params.customer_id;
    var dataObj = req.body.data;
	//todo get custromer list by id
    httpResp(res, 200, {customerlist:'test get case by id'});

});

module.exports = router;
