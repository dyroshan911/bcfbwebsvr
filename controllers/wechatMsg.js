'use strict';
var List = require('wechat').List;
List.add('main', [
    ['{1}.百城贷款的种类', function (info, req, res) {
        res.wait('zhonglei');
    }],
    ['{2}.查看百城贷款的额度', function (info, req, res) {
        res.reply('最高1000万');
    }],
    ['{3}.多长时间能放款', function (info, req, res) {
        res.reply('最快两小时');
    }]
],'请回复相应标号查看详情','----------------------------','详情请访问致电：xxxxxxxxx');

List.add('zhonglei', [
    ['{1}.信用贷', function (info, req, res) {
        res.reply('信用贷款');
    }],
    ['{2}.房产抵押贷', function (info, req, res) {
        res.reply('房产贷款');
    }],
    ['{3}.车子抵押贷', function (info, req, res) {
        res.reply('汽车抵押');
    }],
    ['{4}.返回上级菜单', function (info, req, res) {
        res.wait('main');
    }]
]);


exports.text = function (message, req, res, next) {
    if (message.Content === 'list') {
        res.wait('main');
    } else {
        res.reply('hehe');
        // 或者中断等待回复事务
        // res.nowait('hehe');
    }
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
    }  else if (message.Event == 'CLICK') {
		res.wait('main');
	}
};

