var express = require('express');
var router = express.Router();
var httpcilent = require('../models/httpclient.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	httpcilent.GetResource('http://192.168.1.100/1234.zip', function(err){//192.168.1.100/1234.zip

	});
  	return res.render('index',{
		title: 'ForkSystem',
		connected: true,
		num: 1
	});
});

module.exports = router;
