'use strict';

angular.module('myApp').controller('WechatInsuranceCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.payerOptions = [
			{ id: 0, name: '男主人', value: '男主人' },
			{ id: 1, name: '女主人', value: '女主人' },
			{ id: 2, name: '父亲', value: '父亲' },
			{ id: 3, name: '母亲', value: '母亲' },
			{ id: 4, name: '儿子', value: '儿子' },
			{ id: 5, name: '女儿', value: '女儿' },
			{ id: 6, name: '其他', value: '其他' }
		];

		$scope.insurantOptions = [
			{ id: 0, name: '男主人', value: '男主人' },
			{ id: 1, name: '女主人', value: '女主人' },
			{ id: 2, name: '儿子', value: '儿子' },
			{ id: 3, name: '女儿', value: '女儿' },
			{ id: 4, name: '父亲', value: '父亲' },
			{ id: 5, name: '母亲', value: '母亲' },
			{ id: 6, name: '公公', value: '公公' },
			{ id: 7, name: '婆婆', value: '婆婆' },
			{ id: 8, name: '岳父', value: '岳父' },
			{ id: 9, name: '岳母', value: '岳母' },
			{ id: 10, name: '车辆', value: '车辆' },
			{ id: 11, name: '房屋', value: '房屋' },
			{ id: 12, name: '员工', value: '员工' },
			{ id: 13, name: '厂房', value: '厂房' },
			{ id: 14, name: '其他', value: '其他' }
		];

		$scope.insuranceTypeList = [
			{ id: 0, name: '重大疾病', value: '重大疾病', selected: false },
			{ id: 1, name: '轻症', value: '轻症', selected: false },
			{ id: 2, name: '中症', value: '中症', selected: false },
			{ id: 3, name: '恶性肿瘤', value: '恶性肿瘤', selected: false },
			{ id: 4, name: '住院医疗', value: '住院医疗', selected: false },
			{ id: 5, name: '身故寿险', value: '身故寿险', selected: false },
			{ id: 6, name: '意外保障', value: '意外保障', selected: false },
			{ id: 7, name: '年金理财', value: '年金理财', selected: false },
			{ id: 8, name: '教育保险', value: '教育保险', selected: false },
			{ id: 9, name: '家庭财险', value: '家庭财险', selected: false },
			{ id: 10, name: '车辆保险', value: '车辆保险', selected: false },
			{ id: 11, name: '企业财险', value: '企业财险', selected: false },
			{ id: 12, name: '团意雇主', value: '团意雇主', selected: false },
			{ id: 13, name: '互助保险', value: '互助保险', selected: false },
			{ id: 14, name: '其它保险', value: '其它保险', selected: false }
		];

		$scope.insuranceCompanyIndexList = [
			{
				id: 0,
				name: 'A',
				list: [
					{ id: 0, name: '安信农险', value: '安信农险' },
					{ id: 1, name: '安华农险', value: '安华农险' },
					{ id: 2, name: '安心财险', value: '安心财险' },
					{ id: 3, name: '安盛（香港）', value: '安盛（香港）' },
					{ id: 4, name: '安盛天平', value: '安盛天平' },
					{ id: 5, name: '安联财险', value: '安联财险' },
					{ id: 6, name: '安城财险', value: '安城财险' },
					{ id: 7, name: '安达保险', value: '安达保险' },
					{ id: 8, name: '安邦人寿', value: '安邦人寿' },
					{ id: 9, name: '安邦养老', value: '安邦养老' },
					{ id: 10, name: '安邦财险', value: '安邦财险' },
					{ id: 11, name: '爱心人寿', value: '爱心人寿' }
				]
			},
			{
				id: 1,
				name: 'B',
				list: [
					{ id: 0, name: '保诚（香港）', value: '保诚（香港）' },
					{ id: 1, name: '北大方正', value: '北大方正' },
					{ id: 2, name: '北部湾财险', value: '北部湾财险' },
					{ id: 3, name: '渤海人寿', value: '渤海人寿' },
					{ id: 4, name: '渤海财险', value: '渤海财险' },
					{ id: 5, name: '百年人寿', value: '百年人寿' },
					{ id: 6, name: '出口信用', value: '出口信用' },
					{ id: 7, name: '安达保险', value: '安达保险' },
					{ id: 8, name: '安邦人寿', value: '安邦人寿' },
					{ id: 9, name: '安邦养老', value: '安邦养老' },
					{ id: 10, name: '安邦财险', value: '安邦财险' },
					{ id: 11, name: '爱心人寿', value: '爱心人寿' }
				]
			},
			{
				id: 2,
				name: 'C',
				list: [
					{ id: 0, name: '出口信用', value: '出口信用' },
					{ id: 1, name: '诚泰财险', value: '诚泰财险' },
					{ id: 2, name: '长城人寿', value: '长城人寿' },
					{ id: 3, name: '长安责任', value: '长安责任' },
					{ id: 4, name: '长江养老', value: '长江养老' },
					{ id: 5, name: '长江财险', value: '长江财险' },
					{ id: 6, name: '长生人寿', value: '长生人寿' }
				]
			},
			{
				id: 3,
				name: 'D',
				list: [
					{ id: 0, name: '东京海上', value: '东京海上' },
					{ id: 1, name: '东吴人寿', value: '东吴人寿' },
					{ id: 2, name: '东海航运', value: '东海航运' },
					{ id: 3, name: '大地财产', value: '大地财产' },
					{ id: 4, name: '大都会人寿', value: '大都会人寿' },
					{ id: 5, name: '德华安顾', value: '德华安顾' },
					{ id: 6, name: '都邦保险', value: '都邦保险' },
					{ id: 7, name: '鼎和财险', value: '鼎和财险' }
				]
			},
			{
				id: 4,
				name: 'F',
				list: [
					{ id: 0, name: '复星保德信', value: '东京海上' },
					{ id: 1, name: '复星联合健康', value: '复星联合健康' },
					{ id: 2, name: '富德生命', value: '富德生命' },
					{ id: 3, name: '富德财险', value: '富德财险' },
					{ id: 4, name: '富邦财险', value: '富邦财险' }
				]
			},
			{
				id: 5,
				name: 'G',
				list: [
					{ id: 0, name: '光大永明', value: '光大永明' },
					{ id: 1, name: '国元农险', value: '国元农险' },
					{ id: 2, name: '国华人寿', value: '国华人寿' },
					{ id: 3, name: '国寿养老', value: '国寿养老' },
					{ id: 4, name: '国寿财险', value: '国寿财险' },
					{ id: 5, name: '国泰财险', value: '国泰财险' },
					{ id: 6, name: '国联人寿', value: '国联人寿' },
					{ id: 7, name: '工银安盛', value: '工银安盛' }
				]
			},
			{
				id: 6,
				name: 'H',
				list: [
					{ id: 0, name: '华农财险', value: '华农财险' },
					{ id: 1, name: '华夏人寿', value: '华夏人寿' },
					{ id: 2, name: '华安财险', value: '华安财险' },
					{ id: 3, name: '华汇人寿', value: '华汇人寿' },
					{ id: 4, name: '华泰人寿', value: '华泰人寿' },
					{ id: 5, name: '华泰财险', value: '华泰财险' },
					{ id: 6, name: '华海财险', value: '华海财险' },
					{ id: 7, name: '华贵人寿', value: '华贵人寿' },
					{ id: 8, name: '合众人寿', value: '合众人寿' },
					{ id: 9, name: '合众财险', value: '合众财险' },
					{ id: 10, name: '和泰人寿', value: '和泰人寿' },
					{ id: 11, name: '和谐健康', value: '和谐健康' },
					{ id: 12, name: '宏利（香港）', value: '宏利（香港）' },
					{ id: 13, name: '弘康人寿', value: '弘康人寿' },
					{ id: 14, name: '恒大人寿', value: '恒大人寿' },
					{ id: 15, name: '恒安标准', value: '恒安标准' },
					{ id: 16, name: '恒邦财险', value: '恒邦财险' },
					{ id: 17, name: '横琴人寿', value: '横琴人寿' },
					{ id: 18, name: '汇丰人寿', value: '汇丰人寿' },
					{ id: 19, name: '汇友互助', value: '汇友互助' },
					{ id: 20, name: '海峡金桥', value: '海峡金桥' }
				]
			},
			{
				id: 7,
				name: 'I',
				list: [
					{ id: 0, name: '爱和谊', value: '爱和谊' }
				]
			},
			{
				id: 8,
				name: 'J',
				list: [
					{ id: 0, name: '久隆财险', value: '久隆财险' },
					{ id: 1, name: '交银康联', value: '交银康联' },
					{ id: 2, name: '吉祥人寿', value: '吉祥人寿' },
					{ id: 3, name: '君康人寿', value: '君康人寿' },
					{ id: 4, name: '君龙人寿', value: '君龙人寿' },
					{ id: 5, name: '建信人寿', value: '建信人寿' },
					{ id: 6, name: '建信财险', value: '建信财险' },
					{ id: 7, name: '锦泰财险', value: '锦泰财险' }
				]
			},
			{
				id: 9,
				name: 'K',
				list: [
					{ id: 0, name: '昆仑健康', value: '昆仑健康' }
				]
			},
			{
				id: 10,
				name: 'L',
				list: [
					{ id: 0, name: '利安人寿', value: '利安人寿' },
					{ id: 1, name: '利宝互助', value: '利宝互助' },
					{ id: 2, name: '利宝财险', value: '利宝财险' },
					{ id: 3, name: '劳合社', value: '劳合社' },
					{ id: 4, name: '陆家嘴国寿', value: '陆家嘴国寿' },
					{ id: 5, name: '陆家嘴国泰', value: '陆家嘴国泰' }
				]
			},
			{
				id: 11,
				name: 'M',
				list: [
					{ id: 0, name: '民生人寿', value: '民生人寿' },
					{ id: 1, name: '美亚财险', value: '美亚财险' }
				]
			},
			{
				id: 12,
				name: 'N',
				list: [
					{ id: 0, name: '农银人寿', value: '农银人寿' },
				]
			},
			{
				id: 13,
				name: 'P',
				list: [
					{ id: 0, name: '平安人寿', value: '平安人寿' },
					{ id: 1, name: '平安健康', value: '平安健康' },
					{ id: 2, name: '平安养老', value: '平安养老' },
					{ id: 3, name: '平安财险', value: '平安财险' }
				]
			},
			{
				id: 14,
				name: 'Q',
				list: [
					{ id: 0, name: '前海人寿', value: '前海人寿' },
					{ id: 1, name: '前海财险', value: '前海财险' }
				]
			},
			{
				id: 15,
				name: 'R',
				list: [
					{ id: 0, name: '人保健康', value: '人保健康' },
					{ id: 1, name: '人保寿险', value: '人保寿险' },
					{ id: 2, name: '人保财险', value: '人保财险' },
					{ id: 3, name: '日本兴亚', value: '日本兴亚' },
					{ id: 4, name: '日本财险', value: '日本财险' },
					{ id: 5, name: '瑞再企商', value: '瑞再企商' },
					{ id: 6, name: '瑞泰人寿', value: '瑞泰人寿' }
				]
			},
			{
				id: 16,
				name: 'S',
				list: [
					{ id: 0, name: '三井住友', value: '三井住友' },
					{ id: 1, name: '三星财险', value: '三星财险' },
					{ id: 2, name: '上海人寿', value: '上海人寿' },
					{ id: 3, name: '史带财险', value: '史带财险' },
					{ id: 4, name: '苏黎世财险', value: '苏黎世财险' }
				]
			},
			{
				id: 17,
				name: 'T',
				list: [
					{ id: 0, name: '同方全球', value: '同方全球' },
					{ id: 1, name: '天安人寿', value: '天安人寿' },
					{ id: 2, name: '天安财险', value: '天安财险' },
					{ id: 3, name: '太保安联', value: '太保安联' },
					{ id: 4, name: '太平人寿', value: '太平人寿' },
					{ id: 5, name: '太平养老', value: '太平养老' },
					{ id: 6, name: '太平洋人寿', value: '太平洋人寿' },
					{ id: 7, name: '太平洋财险', value: '太平洋财险' },
					{ id: 8, name: '太平财险', value: '太平财险' },
					{ id: 9, name: '泰山财险', value: '泰山财险' },
					{ id: 10, name: '泰康人寿', value: '泰康人寿' },
					{ id: 11, name: '泰康养老', value: '泰康养老' },
					{ id: 12, name: '泰康在线', value: '泰康在线' },
					{ id: 13, name: '铁路自保', value: '铁路自保' }
				]
			},
			{
				id: 18,
				name: 'X',
				list: [
					{ id: 0, name: '信利保险', value: '信利保险' },
					{ id: 1, name: '信泰人寿', value: '信泰人寿' },
					{ id: 2, name: '信美人寿', value: '信美人寿' },
					{ id: 3, name: '信诚人寿', value: '信诚人寿' },
					{ id: 4, name: '信达财险', value: '信达财险' },
					{ id: 5, name: '幸福人寿', value: '幸福人寿' },
					{ id: 6, name: '新光海航', value: '新光海航' },
					{ id: 7, name: '新华人寿', value: '新华人寿' },
					{ id: 8, name: '新华养老', value: '新华养老' },
					{ id: 9, name: '现代财险', value: '现代财险' },
					{ id: 10, name: '鑫安车险', value: '鑫安车险' }
				]
			},
			{
				id: 19,
				name: 'Y',
				list: [
					{ id: 0, name: '亚太财险', value: '亚太财险' },
					{ id: 1, name: '友邦（香港）', value: '友邦（香港）' },
					{ id: 2, name: '友邦保险', value: '友邦保险' },
					{ id: 3, name: '易安财险', value: '易安财险' },
					{ id: 4, name: '永安财险', value: '永安财险' },
					{ id: 5, name: '永诚财险', value: '永诚财险' },
					{ id: 6, name: '燕赵财险', value: '燕赵财险' },
					{ id: 7, name: '英大人寿', value: '英大人寿' },
					{ id: 8, name: '英大财险', value: '英大财险' },
					{ id: 9, name: '阳光人寿', value: '阳光人寿' },
					{ id: 10, name: '阳光信保', value: '阳光信保' },
					{ id: 11, name: '阳光农险', value: '阳光农险' },
					{ id: 5, name: '阳光财险', value: '阳光财险' }
				]
			},
			{
				id: 20,
				name: 'Z',
				list: [
					{ id: 0, name: '中信保诚', value: '中信保诚' },
					{ id: 1, name: '中华人寿', value: '中华人寿' },
					{ id: 2, name: '中华联合财险', value: '中华联合财险' },
					{ id: 3, name: '中原农险', value: '中原农险' },
					{ id: 4, name: '中国人寿', value: '中国人寿' },
					{ id: 5, name: '中国人寿（海外）', value: '中国人寿（海外）' },
					{ id: 6, name: '中宏人寿', value: '中宏人寿' },
					{ id: 7, name: '中德安联', value: '中德安联' },
					{ id: 8, name: '中意人寿', value: '中意人寿' },
					{ id: 9, name: '中意财险', value: '中意财险' },
					{ id: 10, name: '中法人寿', value: '中法人寿' },
					{ id: 11, name: '中煤财险', value: '中煤财险' },
					{ id: 12, name: '中石油财险', value: '中石油财险' },
					{ id: 13, name: '中航安盟财险', value: '中航安盟财险' },
					{ id: 14, name: '中英人寿', value: '中英人寿' },
					{ id: 15, name: '中荷人寿', value: '中荷人寿' },
					{ id: 16, name: '中融人寿', value: '中融人寿' },
					{ id: 17, name: '中路财险', value: '中路财险' },
					{ id: 18, name: '中远海运', value: '中远海运' },
					{ id: 19, name: '中邮人寿', value: '中邮人寿' },
					{ id: 20, name: '中铁自保', value: '中铁自保' },
					{ id: 21, name: '中银三星', value: '中银三星' },
					{ id: 22, name: '中银财险', value: '中银财险' },
					{ id: 23, name: '中韩人寿', value: '中韩人寿' },
					{ id: 24, name: '众安在线', value: '众安在线' },
					{ id: 25, name: '众惠相互', value: '众惠相互' },
					{ id: 26, name: '众诚车险', value: '众诚车险' },
					{ id: 27, name: '招商仁和', value: '招商仁和' },
					{ id: 28, name: '招商信诺', value: '招商信诺' },
					{ id: 29, name: '浙商财险', value: '浙商财险' },
					{ id: 30, name: '珠峰保险', value: '珠峰保险' },
					{ id: 31, name: '珠江人寿', value: '珠江人寿' },
					{ id: 32, name: '紫金财险', value: '紫金财险' }
				]
			},
		];

		//jQuery
		$('#myTabs a[href="#myInsurance"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		})

		$('#myTabs a[href="#insuranceInfo"]').click(function (e) {
			e.preventDefault()
			$(this).tab('show');
		})
	}]);
