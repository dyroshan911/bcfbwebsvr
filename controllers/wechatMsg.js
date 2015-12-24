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
		subscribeUser(message.FromUserName);
		res.reply([{
		        title: '欢迎关注',
		        description: '欢迎关注百城富邦',
		        picurl: 'http://sn9kwt.sonix.cn/web/img/msgIcon/snsense.png',
		        url: 'http://sn9kwt.sonix.cn/web/'
	      }]);
	} 
};

