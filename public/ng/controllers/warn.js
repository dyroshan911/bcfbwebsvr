'use strict';

angular.module('myApp').controller('WarnCtrl', ['$scope', '$location', '$rootScope', 'UserService',
	function ($scope, $location, $rootScope, UserService) {
		$scope.warningContent = '';
		
		getWarningType();
		
		//functions
		$scope.onClose = function () {

		};
		
		function getWarningType() {
			var type = $location.search().type;
			switch (type) {
				case 'completed':
					$scope.warningContent = '微信号已绑定百城账号，请从微信菜单进入主页。';
					break;
				case 'need_singup':
					$scope.warningContent = '微信号尚未注册，请从微信菜单选择注册百城。';
					break;
				default:
					break;
			}
		}
		
		function wechatJsConfig() {
			var dataObj = {
				debug: false,
				jsApiList: ['closeWindow'],
				configUrl: $location.absUrl()
			};
			UserService.getJsConfigData($rootScope.session.token, dataObj, function (res) {
				if (res.resultCode == 'S') {
					JsConfig(res.content);
				} else {
					alert(res.content);
				}
			}, function (msg) {
				alert(msg);
			});
		}
		
		function JsConfig(data) {
			var obj = {
				debug: data.debug,
				appId: data.appId,
				timestamp: parseInt(data.timestamp),
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: data.jsApiList
			};
			wx.config(obj);
			wx.ready(function () { });
			wx.error(function (res) {
				alert(JSON.stringify(res));
			});
		}
	}]);