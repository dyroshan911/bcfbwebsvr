'use strict';
/*var List = require('wechat').List;
List.add('main', [
    ['{1}.如何注册成为百城会员', function (info, req, res) {
        res.reply('微信中搜索“百城金融”公众号，关注公众号。点击百城账户，再点击注册百城，完善信息即可成为百城会员，推荐客户，获取奖励。');
    }],
    ['{2}.如何在微信上推荐客户', function (info, req, res) {
        res.reply('首先注册成为百城会员。点击百城账户，选择我的百城主页。点击新增客户。');
    }],
    ['{3}.如何查询推荐客户进度', function (info, req, res) {
        res.reply('点击百城账户，选择我的百城主页。输入客户名字。点击搜索。或者直接与当前处理人直接电话联系。');
    }]
],'请回复相应标号查看详情','----------------------------','详情请访问致电：028-67010408');*/


exports.text = function (message, req, res, next) {
    //if (message.Content === 'list') {
        //res.wait('main');
    //} else {
        res.reply('欢迎使用百城金融服务帐户。您输入的信息无法识别。');
        // 或者中断等待回复事务
        // res.nowait('hehe');
    //}
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
        res.reply('感谢您关注百城金融！我们专注于个人及企业融资贷款服务，快速解决您的资金问题！\n\n咨询热线：028-67010408\n\n1.房产贷款\n2.汽车贷款\n3.信用贷款\n4.企业贷款\n5.短期贷款\n\nwww.baichengfubang.com\n\n诚挚的邀请您注册成为我们的会员，推荐客户都有额外奖励哦！');
    }  else if (message.Event == 'CLICK') {
		res.reply('    百城富邦金融外包服务有限公司成立于2013年12月，注册资本1000万。两年多时间己经为上万名客户提供了贷款咨询及服务。目前公司设有总经理室、风控业管部、电销中心、渠道业务部。公司员工人数70人其中:渠道部15人，电销中心52人，风控业管部3人，总经理1人。\n\n    公司秉承着“以人为本、立足市场、服务大众、共赢共好”为经营理念；“以诚信第一、效率第一、客户至上、服务至上”为公司宗旨；立志为四川市场个人及小微企业提供最佳金融解决方案。\n\n    公司为员工提供顺畅的晋升通道、明确的职业规划以及全方位的培训包括：新人入职培训、技能提升培训、实战案例分享、职业道德教育。公司以“事业成就人才，人才成就事业”为根本，让每一位百城富邦员工都可以获得财富增长与价值的实现。\n\n    伴随着四川市场金融风险逐渐加剧，公司对风险严格把关。我们不仅营销客户更注重把控客户风险。对客户资料的初审、筛选及贷后管理为合作机构提供高质量的客户群体。\n\n    现目前公司合作机构：平安银行、中国银行、中国农业银行、中国工商银行，中国建设银行，成都农商银行、民生银行、中信银行、德阳银行、南充商业银行等多家实力金融机构。\n\n    我们力争成为市场上最好的第三方金融服务机构与百城合作您将收获一个值得信任的朋友，百城金融值得拥有！');
	}
};

