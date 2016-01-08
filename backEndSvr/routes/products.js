var express = require('express');
var router = express.Router();
/** a common fcuntion to package response */

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}


/* create product, */
router.post('/', function (req, res) {
    var token = req.query.token;
    var dataObj = req.body.data;
	//...
    
    httpResp(res, 201, {create:'create product'});
});


/* get product list*/
router.get('/', function (req, res) {
    var token = req.query.token;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;

    httpResp(res, 200, {productlist:'test get product'});

});


/* get product list by id*/
router.get('/:product_id', function (req, res) {
    var token = req.query.token;
    var productId = req.params.product_id;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var filter = req.query.filter;
	//todo get custromer list by id
    httpResp(res, 200, {customerlist:'test get product by id'});

});

/* update product info by id*/
router.put('/:customer_id', function (req, res) {
    var token = req.query.token;
    var customerId = req.params.customer_id;
    var dataObj = req.body.data;
	//todo get custromer list by id
    httpResp(res, 200, {customerlist:'test get product by id'});

});

module.exports = router;
