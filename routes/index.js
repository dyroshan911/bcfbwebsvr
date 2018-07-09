var express = require('express');
var router = express.Router();
var env = require('../services/config').data.main.env;

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: '百城金融', env: env });
});

//
router.get('/:spec', function(req, res) {
	res.render('index', { title: '百城金融', env: env });
});

//for angular partial page service
router.get('/partial/:spec', function(req, res) {
	res.render(req.params.spec, { title: '百城金融', env: env });
});

module.exports = router;
