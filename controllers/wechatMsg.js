'use strict';

exports.text = function (message, req, res, next) {
	res.reply('text');
};

exports.image = function (message, req, res, next) {
	console.log(message);
	res.reply('image')
};

exports.voice = function (message, req, res, next) {
	console.log(message);
	res.reply('voice')
};

exports.video = function (message, req, res, next) {
	console.log(message);
	res.reply('video')
};

exports.location = function (message, req, res, next) {
	console.log(message);
	res.reply('location')
};

exports.link = function (message, req, res, next) {
	console.log(message);
	res.reply('link')
};

exports.event = function (message, req, res, next) {
	console.log(message);
	if (message.Event == 'subscribe') {
		res.reply([{
		        title: '欢迎关注',
		        description: '点击快速申请贷款',
		        picurl: 'http://120.25.122.178/img/product-depict.jpg',
		        url: 'http://120.25.122.178/wechat-apply'
	      }]);
	} 
};

