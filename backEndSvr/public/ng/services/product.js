'use strict';

angular.module('myApp').factory('ProductService', ['ApiService',
    function (ApiService) {
        var cfgData = {};
        
        cfgData.addProduct = function (token, dataObj, successcb, failcb) {
            var obj = {
                params: {
                    token: token
                },
                data: dataObj
            };
            return ApiService.post('api/products', obj, successcb, failcb);
		};
		
		cfgData.updateProduct = function (token, productId, dataObj, successcb, failcb) {
			var url = 'api/products/' + productId;
            var obj = {
                params: {
                    token: token
                },
                data: dataObj
            };
            return ApiService.put(url, obj, successcb, failcb);
        };

        cfgData.getProducts = function (token, paramObj, successcb, failcb) {
            var obj = {
                params: {
                    token: token,
                    offset: paramObj.offset,
                    limit: paramObj.limit
                }
            };
            return ApiService.get('api/products', obj, successcb, failcb);
        };

		cfgData.removeProduct = function (token, productId, successcb, failcb) {
			var url = 'api/products/' + productId;
            var obj = {
                params: {
                    token: token
                }
            };   
            return ApiService.delete(url, obj, successcb, failcb);
        };

        return cfgData;
    }]);