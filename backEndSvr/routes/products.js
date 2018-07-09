var express = require('express');
var router = express.Router();
var products = require('../controllers/products.js');

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}


/* create product, */
router.post('/', function (req, res) {
    var dataObj = req.body.data;
	products.createProduct(dataObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* update product, */
router.put('/:productId', function (req, res) {
    var dataObj = req.body.data;
    var productId = req.params.productId;
	products.updateProduct(productId, dataObj, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });
});


/* get product list*/
router.get('/', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    products.getProductsList(offset, limit, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
});


/* delete product list by id*/
router.delete('/:product_id', function (req, res) {

    var productId = req.params.product_id;
	products.deleteProduct(productId, function (statusCode, result) {
        httpResp(res, statusCode, result);
    });

});

/* update product info by id
router.put('/:customer_id', function (req, res) {
    var token = req.query.token;
    var customerId = req.params.customer_id;
    var dataObj = req.body.data;
	//todo get custromer list by id
    httpResp(res, 200, {customerlist:'test get product by id'});

});*/

module.exports = router;
