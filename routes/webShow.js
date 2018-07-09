var express = require('express');
var router = express.Router();
var webShows = require('../controllers/webShow.js');

function httpResp(res, code, result) {
    res.status(code).json(result);
    if (code >= 400) {
        console.error(JSON.stringify(result));
    }
}

router.get('/cases', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    webShows.getCasesList(offset, limit, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
});

router.get('/products', function (req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    webShows.getProductsList(offset, limit, function(statusCode, result){
        httpResp(res, statusCode, result);
    });
});

module.exports = router;