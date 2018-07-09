'use strict';

angular.module('myApp').factory('ApiService', ['$http', 'MsgService',
	function ($http, MsgService) {
		var cfgData = {};
		
		var makeArg = function (arg) {
			var paramStr = '';
			switch (typeof arg) {
				case 'object':
					var i = 0;
					for (var elem in arg) {
						if (i !== 0) {
							paramStr += '&';
						}
						paramStr += (elem + '=' + arg[elem]);
						++i;
					}
					return paramStr;
				case 'undefined':
				case 'function':
					return '';
				default:
					return String(arg);
			}
		};
		
		var makeUrl = function () {
			var argLen = arguments.length;
			if (argLen === 0) {
				return '';
			}
			if (typeof arguments[0] != 'string') {
				return '';
			}
			var urlStr = arguments[0];
			if (argLen == 1) {
				return urlStr;
			}
			urlStr = urlStr + '?' + makeArg(arguments[1]);
			for (var i = 2; i < argLen; ++i) {
				urlStr = urlStr + '&' + makeArg(arguments[1]);
			}
			return urlStr;
		};
		
		cfgData.get = function (url, obj, successcb, failcb) {
			if (obj.params) {
				var date = new Date();
				obj.params._timestamp = date.getTime();
				url = makeUrl(url, obj.params);
				delete obj.params;
			}
			obj.timeout = (1000 * 30);
			return $http.get(url, obj).success(function (data, status, headers, config) {
				successcb(data);
			}).error(function (data, status, headers, config) {
				if (data.code) {
					var msg = MsgService.getMsg(data.code);
					failcb(msg);
					msg.debug();
				} else {
					console.error(data);
					failcb({ message: '未知错误' });
				}
			});
		};
		
		cfgData.post = function (url, obj, successcb, failcb) {
			if (obj.params) {
				var date = new Date();
				obj.params._timestamp = date.getTime();
				url = makeUrl(url, obj.params);
				delete obj.params;
			}
			obj.timeout = (1000 * 30);
			return $http.post(url, obj).success(function (data, status, headers, config) {
				successcb(data);
			}).error(function (data, status, headers, config) {
				if (data.code) {
					var msg = MsgService.getMsg(data.code);
					failcb(msg);
					msg.debug();
				} else {
					console.error(data);
					failcb({ message: '未知错误' });
				}
			});
		};
		
		cfgData.put = function (url, obj, successcb, failcb) {
			if (obj.params) {
				var date = new Date();
				obj.params._timestamp = date.getTime();
				url = makeUrl(url, obj.params);
				delete obj.params;
			}
			obj.timeout = (1000 * 30);
			return $http.put(url, obj).success(function (data, status, headers, config) {
				successcb(data);
			}).error(function (data, status, headers, config) {
				if (data.code) {
					var msg = MsgService.getMsg(data.code);
					failcb(msg);
					msg.debug();
				} else {
					console.error(data);
					failcb({ message: '未知错误' });
				}
			});
		};
		
		cfgData.delete = function (url, obj, successcb, failcb) {
			if (obj.params) {
				var date = new Date();
				obj.params._timestamp = date.getTime();
				url = makeUrl(url, obj.params);
				delete obj.params;
			}
			obj.timeout = (1000 * 30);
			return $http.delete(url, obj).success(function (data, status, headers, config) {
				successcb(data);
			}).error(function (data, status, headers, config) {
				if (data.code) {
					var msg = MsgService.getMsg(data.code);
					failcb(msg);
					msg.debug();
				} else {
					console.error(data);
					failcb({ message: '未知错误' });
				}
			});
		};
		
		cfgData.head = function (url, obj, successcb, failcb) {
			if (obj.params) {
				var date = new Date();
				obj.params._timestamp = date.getTime();
				url = makeUrl(url, obj.params);
				delete obj.params;
			}
			obj.timeout = (1000 * 30);
			return $http.head(url, obj).success(function (data, status, headers, config) {
				successcb('');
			}).error(function (data, status, headers, config) {
				if (data.code) {
					var msg = MsgService.getMsg(data.code);
					failcb(msg);
					msg.debug();
				} else {
					console.error(data);
					failcb({ message: '未知错误' });
				};
			});
		};
		
		return cfgData;
	}]);