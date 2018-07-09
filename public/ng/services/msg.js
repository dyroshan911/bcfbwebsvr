'use strict';

angular.module('myApp').factory('MsgService', function () {
	var cfgData = {};

	var msgTab = {
		//web server error	
		"e0004": { "name": "NotFound", "zh-cn": "此微信未绑定百城账户" },
		"e1103": { "name": "CreateUserFail", "zh-cn": "新增使用者账户失败，可能因为使用者已经存在，或者服务器忙碌，请检查后重试" },
		"e1104": { "name": "CompleteUserFail", "zh-cn": "完善账户失败，可能因为使用者已经存在，或者服务器忙碌，请检查后重试" },
		"e1105": { "name": "jobNumberError", "zh-cn": "推荐人ID错误，请核对后重新填写" },
		"e1109": { "name": "LoginFail", "zh-cn": "登入失败，请检查用户名和密码" },
		"e1110": { "name": "VisitForbidden", "zh-cn": "您有内容无权访问，可能是因为您的登录已经失效，请重新登录" },
		"e2001": { "name": "ConnectFail", "zh-cn": "无法连接服务器，请稍后重试" },
		"e2002": { "name": "VisitForbidden", "zh-cn": "网页过期，请刷新页面，微信用户请重新打开页面" },
		"e2003": { "name": "wechat-ConnectFail", "zh-cn": "微信授权失败" },
		"e2004": { "name": "wechat-bindFail", "zh-cn": "用户名密码错误，或此帐号已绑定其他微信" },
		"e99999": { "name": "UnKnown", "zh-cn": "未知错误, 请在调试窗口查看错误信息，并回报给网站管理员，谢谢!" }
	};
	var lang = 'zh-cn';

	cfgData.setLang = function (lang) {
		lang = 'zh-cn';
	};

	cfgData.getMsg = function (code) {
		var msgItem = msgTab[code];
		if (!msgItem) {
			msgItem = msgTab['e99999'];
		}
		var msg = {
			code: code,
			name: msgItem.name,
			message: msgItem[lang]
		};
		msg.alert = function () {
			alert(msg.message);
		};
		msg.debug = function () {
			switch (msg.code[0]) {
				case 'e':
					console.error(this.message);
					break;
				case 'w':
					console.warning(this.message);
					break;
				default:
					console.log(this.message);
					break;
			}
		};
		return msg;
	};

	return cfgData;
});