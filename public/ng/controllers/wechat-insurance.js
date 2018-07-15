'use strict';

angular.module('myApp').controller('WechatInsuranceCtrl', ['$scope', '$location', '$rootScope', 'BusinessService',
	function ($scope, $location, $rootScope, BusinessService) {
		$scope.payerOptions = [
			{ id: 0, name: '������', value: '������' },
			{ id: 1, name: 'Ů����', value: 'Ů����' },
			{ id: 2, name: '����', value: '����' },
			{ id: 3, name: 'ĸ��', value: 'ĸ��' },
			{ id: 4, name: '����', value: '����' },
			{ id: 5, name: 'Ů��', value: 'Ů��' },
			{ id: 6, name: '����', value: '����' }
		];

		$scope.insurantOptions = [
			{ id: 0, name: '������', value: '������' },
			{ id: 1, name: 'Ů����', value: 'Ů����' },
			{ id: 2, name: '����', value: '����' },
			{ id: 3, name: 'Ů��', value: 'Ů��' },
			{ id: 4, name: '����', value: '����' },
			{ id: 5, name: 'ĸ��', value: 'ĸ��' },
			{ id: 6, name: '����', value: '����' },
			{ id: 7, name: '����', value: '����' },
			{ id: 8, name: '����', value: '����' },
			{ id: 9, name: '��ĸ', value: '��ĸ' },
			{ id: 10, name: '����', value: '����' },
			{ id: 11, name: '����', value: '����' },
			{ id: 12, name: 'Ա��', value: 'Ա��' },
			{ id: 13, name: '����', value: '����' },
			{ id: 14, name: '����', value: '����' }
		];

		$scope.insuranceTypeList = [
			{ id: 0, name: '�ش󼲲�', value: '�ش󼲲�', selected: false },
			{ id: 1, name: '��֢', value: '��֢', selected: false },
			{ id: 2, name: '��֢', value: '��֢', selected: false },
			{ id: 3, name: '��������', value: '��������', selected: false },
			{ id: 4, name: 'סԺҽ��', value: 'סԺҽ��', selected: false },
			{ id: 5, name: '�������', value: '�������', selected: false },
			{ id: 6, name: '���Ᵽ��', value: '���Ᵽ��', selected: false },
			{ id: 7, name: '������', value: '������', selected: false },
			{ id: 8, name: '��������', value: '��������', selected: false },
			{ id: 9, name: '��ͥ����', value: '��ͥ����', selected: false },
			{ id: 10, name: '��������', value: '��������', selected: false },
			{ id: 11, name: '��ҵ����', value: '��ҵ����', selected: false },
			{ id: 12, name: '�������', value: '�������', selected: false },
			{ id: 13, name: '��������', value: '��������', selected: false },
			{ id: 14, name: '��������', value: '��������', selected: false }
		];

		$scope.insuranceCompanyIndexList = [
			{
				id: 0,
				name: 'A',
				list: [
					{ id: 0, name: '����ũ��', value: '����ũ��' },
					{ id: 1, name: '����ũ��', value: '����ũ��' },
					{ id: 2, name: '���Ĳ���', value: '���Ĳ���' },
					{ id: 3, name: '��ʢ����ۣ�', value: '��ʢ����ۣ�' },
					{ id: 4, name: '��ʢ��ƽ', value: '��ʢ��ƽ' },
					{ id: 5, name: '��������', value: '��������' },
					{ id: 6, name: '���ǲ���', value: '���ǲ���' },
					{ id: 7, name: '���ﱣ��', value: '���ﱣ��' },
					{ id: 8, name: '��������', value: '��������' },
					{ id: 9, name: '��������', value: '��������' },
					{ id: 10, name: '�������', value: '�������' },
					{ id: 11, name: '��������', value: '��������' }
				]
			},
			{
				id: 1,
				name: 'B',
				list: [
					{ id: 0, name: '���ϣ���ۣ�', value: '���ϣ���ۣ�' },
					{ id: 1, name: '������', value: '������' },
					{ id: 2, name: '���������', value: '���������' },
					{ id: 3, name: '��������', value: '��������' },
					{ id: 4, name: '��������', value: '��������' },
					{ id: 5, name: '��������', value: '��������' },
					{ id: 6, name: '��������', value: '��������' },
					{ id: 7, name: '���ﱣ��', value: '���ﱣ��' },
					{ id: 8, name: '��������', value: '��������' },
					{ id: 9, name: '��������', value: '��������' },
					{ id: 10, name: '�������', value: '�������' },
					{ id: 11, name: '��������', value: '��������' }
				]
			},
			{
				id: 2,
				name: 'C',
				list: [
					{ id: 0, name: '��������', value: '��������' },
					{ id: 1, name: '��̩����', value: '��̩����' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '��������', value: '��������' },
					{ id: 4, name: '��������', value: '��������' },
					{ id: 5, name: '��������', value: '��������' },
					{ id: 6, name: '��������', value: '��������' }
				]
			},
			{
				id: 3,
				name: 'D',
				list: [
					{ id: 0, name: '��������', value: '��������' },
					{ id: 1, name: '��������', value: '��������' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '��زƲ�', value: '��زƲ�' },
					{ id: 4, name: '�󶼻�����', value: '�󶼻�����' },
					{ id: 5, name: '�»�����', value: '�»�����' },
					{ id: 6, name: '�����', value: '�����' },
					{ id: 7, name: '���Ͳ���', value: '���Ͳ���' }
				]
			},
			{
				id: 4,
				name: 'F',
				list: [
					{ id: 0, name: '���Ǳ�����', value: '��������' },
					{ id: 1, name: '�������Ͻ���', value: '�������Ͻ���' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '���²���', value: '���²���' },
					{ id: 4, name: '�������', value: '�������' }
				]
			},
			{
				id: 5,
				name: 'G',
				list: [
					{ id: 0, name: '�������', value: '�������' },
					{ id: 1, name: '��Ԫũ��', value: '��Ԫũ��' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '��������', value: '��������' },
					{ id: 4, name: '���ٲ���', value: '���ٲ���' },
					{ id: 5, name: '��̩����', value: '��̩����' },
					{ id: 6, name: '��������', value: '��������' },
					{ id: 7, name: '������ʢ', value: '������ʢ' }
				]
			},
			{
				id: 6,
				name: 'H',
				list: [
					{ id: 0, name: '��ũ����', value: '��ũ����' },
					{ id: 1, name: '��������', value: '��������' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '��������', value: '��������' },
					{ id: 4, name: '��̩����', value: '��̩����' },
					{ id: 5, name: '��̩����', value: '��̩����' },
					{ id: 6, name: '��������', value: '��������' },
					{ id: 7, name: '��������', value: '��������' },
					{ id: 8, name: '��������', value: '��������' },
					{ id: 9, name: '���ڲ���', value: '���ڲ���' },
					{ id: 10, name: '��̩����', value: '��̩����' },
					{ id: 11, name: '��г����', value: '��г����' },
					{ id: 12, name: '��������ۣ�', value: '��������ۣ�' },
					{ id: 13, name: '�뿵����', value: '�뿵����' },
					{ id: 14, name: '�������', value: '�������' },
					{ id: 15, name: '�㰲��׼', value: '�㰲��׼' },
					{ id: 16, name: '������', value: '������' },
					{ id: 17, name: '��������', value: '��������' },
					{ id: 18, name: '�������', value: '�������' },
					{ id: 19, name: '���ѻ���', value: '���ѻ���' },
					{ id: 20, name: '��Ͽ����', value: '��Ͽ����' }
				]
			},
			{
				id: 7,
				name: 'I',
				list: [
					{ id: 0, name: '������', value: '������' }
				]
			},
			{
				id: 8,
				name: 'J',
				list: [
					{ id: 0, name: '��¡����', value: '��¡����' },
					{ id: 1, name: '��������', value: '��������' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '��������', value: '��������' },
					{ id: 4, name: '��������', value: '��������' },
					{ id: 5, name: '��������', value: '��������' },
					{ id: 6, name: '���Ų���', value: '���Ų���' },
					{ id: 7, name: '��̩����', value: '��̩����' }
				]
			},
			{
				id: 9,
				name: 'K',
				list: [
					{ id: 0, name: '���ؽ���', value: '���ؽ���' }
				]
			},
			{
				id: 10,
				name: 'L',
				list: [
					{ id: 0, name: '��������', value: '��������' },
					{ id: 1, name: '��������', value: '��������' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '�ͺ���', value: '�ͺ���' },
					{ id: 4, name: '½�������', value: '½�������' },
					{ id: 5, name: '½�����̩', value: '½�����̩' }
				]
			},
			{
				id: 11,
				name: 'M',
				list: [
					{ id: 0, name: '��������', value: '��������' },
					{ id: 1, name: '���ǲ���', value: '���ǲ���' }
				]
			},
			{
				id: 12,
				name: 'N',
				list: [
					{ id: 0, name: 'ũ������', value: 'ũ������' },
				]
			},
			{
				id: 13,
				name: 'P',
				list: [
					{ id: 0, name: 'ƽ������', value: 'ƽ������' },
					{ id: 1, name: 'ƽ������', value: 'ƽ������' },
					{ id: 2, name: 'ƽ������', value: 'ƽ������' },
					{ id: 3, name: 'ƽ������', value: 'ƽ������' }
				]
			},
			{
				id: 14,
				name: 'Q',
				list: [
					{ id: 0, name: 'ǰ������', value: 'ǰ������' },
					{ id: 1, name: 'ǰ������', value: 'ǰ������' }
				]
			},
			{
				id: 15,
				name: 'R',
				list: [
					{ id: 0, name: '�˱�����', value: '�˱�����' },
					{ id: 1, name: '�˱�����', value: '�˱�����' },
					{ id: 2, name: '�˱�����', value: '�˱�����' },
					{ id: 3, name: '�ձ�����', value: '�ձ�����' },
					{ id: 4, name: '�ձ�����', value: '�ձ�����' },
					{ id: 5, name: '��������', value: '��������' },
					{ id: 6, name: '��̩����', value: '��̩����' }
				]
			},
			{
				id: 16,
				name: 'S',
				list: [
					{ id: 0, name: '����ס��', value: '����ס��' },
					{ id: 1, name: '���ǲ���', value: '���ǲ���' },
					{ id: 2, name: '�Ϻ�����', value: '�Ϻ�����' },
					{ id: 3, name: 'ʷ������', value: 'ʷ������' },
					{ id: 4, name: '����������', value: '����������' }
				]
			},
			{
				id: 17,
				name: 'T',
				list: [
					{ id: 0, name: 'ͬ��ȫ��', value: 'ͬ��ȫ��' },
					{ id: 1, name: '�찲����', value: '�찲����' },
					{ id: 2, name: '�찲����', value: '�찲����' },
					{ id: 3, name: '̫������', value: '̫������' },
					{ id: 4, name: '̫ƽ����', value: '̫ƽ����' },
					{ id: 5, name: '̫ƽ����', value: '̫ƽ����' },
					{ id: 6, name: '̫ƽ������', value: '̫ƽ������' },
					{ id: 7, name: '̫ƽ�����', value: '̫ƽ�����' },
					{ id: 8, name: '̫ƽ����', value: '̫ƽ����' },
					{ id: 9, name: '̩ɽ����', value: '̩ɽ����' },
					{ id: 10, name: '̩������', value: '̩������' },
					{ id: 11, name: '̩������', value: '̩������' },
					{ id: 12, name: '̩������', value: '̩������' },
					{ id: 13, name: '��·�Ա�', value: '��·�Ա�' }
				]
			},
			{
				id: 18,
				name: 'X',
				list: [
					{ id: 0, name: '��������', value: '��������' },
					{ id: 1, name: '��̩����', value: '��̩����' },
					{ id: 2, name: '��������', value: '��������' },
					{ id: 3, name: '�ų�����', value: '�ų�����' },
					{ id: 4, name: '�Ŵ����', value: '�Ŵ����' },
					{ id: 5, name: '�Ҹ�����', value: '�Ҹ�����' },
					{ id: 6, name: '�¹⺣��', value: '�¹⺣��' },
					{ id: 7, name: '�»�����', value: '�»�����' },
					{ id: 8, name: '�»�����', value: '�»�����' },
					{ id: 9, name: '�ִ�����', value: '�ִ�����' },
					{ id: 10, name: '�ΰ�����', value: '�ΰ�����' }
				]
			},
			{
				id: 19,
				name: 'Y',
				list: [
					{ id: 0, name: '��̫����', value: '��̫����' },
					{ id: 1, name: '�Ѱ��ۣ�', value: '�Ѱ��ۣ�' },
					{ id: 2, name: '�Ѱ��', value: '�Ѱ��' },
					{ id: 3, name: '�װ�����', value: '�װ�����' },
					{ id: 4, name: '��������', value: '��������' },
					{ id: 5, name: '���ϲ���', value: '���ϲ���' },
					{ id: 6, name: '���Բ���', value: '���Բ���' },
					{ id: 7, name: 'Ӣ������', value: 'Ӣ������' },
					{ id: 8, name: 'Ӣ�����', value: 'Ӣ�����' },
					{ id: 9, name: '��������', value: '��������' },
					{ id: 10, name: '�����ű�', value: '�����ű�' },
					{ id: 11, name: '����ũ��', value: '����ũ��' },
					{ id: 5, name: '�������', value: '�������' }
				]
			},
			{
				id: 20,
				name: 'Z',
				list: [
					{ id: 0, name: '���ű���', value: '���ű���' },
					{ id: 1, name: '�л�����', value: '�л�����' },
					{ id: 2, name: '�л����ϲ���', value: '�л����ϲ���' },
					{ id: 3, name: '��ԭũ��', value: '��ԭũ��' },
					{ id: 4, name: '�й�����', value: '�й�����' },
					{ id: 5, name: '�й����٣����⣩', value: '�й����٣����⣩' },
					{ id: 6, name: '�к�����', value: '�к�����' },
					{ id: 7, name: '�е°���', value: '�е°���' },
					{ id: 8, name: '��������', value: '��������' },
					{ id: 9, name: '�������', value: '�������' },
					{ id: 10, name: '�з�����', value: '�з�����' },
					{ id: 11, name: '��ú����', value: '��ú����' },
					{ id: 12, name: '��ʯ�Ͳ���', value: '��ʯ�Ͳ���' },
					{ id: 13, name: '�к����˲���', value: '�к����˲���' },
					{ id: 14, name: '��Ӣ����', value: '��Ӣ����' },
					{ id: 15, name: '�к�����', value: '�к�����' },
					{ id: 16, name: '��������', value: '��������' },
					{ id: 17, name: '��·����', value: '��·����' },
					{ id: 18, name: '��Զ����', value: '��Զ����' },
					{ id: 19, name: '��������', value: '��������' },
					{ id: 20, name: '�����Ա�', value: '�����Ա�' },
					{ id: 21, name: '��������', value: '��������' },
					{ id: 22, name: '��������', value: '��������' },
					{ id: 23, name: '�к�����', value: '�к�����' },
					{ id: 24, name: '�ڰ�����', value: '�ڰ�����' },
					{ id: 25, name: '�ڻ��໥', value: '�ڻ��໥' },
					{ id: 26, name: '�ڳϳ���', value: '�ڳϳ���' },
					{ id: 27, name: '�����ʺ�', value: '�����ʺ�' },
					{ id: 28, name: '������ŵ', value: '������ŵ' },
					{ id: 29, name: '���̲���', value: '���̲���' },
					{ id: 30, name: '��屣��', value: '��屣��' },
					{ id: 31, name: '�齭����', value: '�齭����' },
					{ id: 32, name: '�Ͻ����', value: '�Ͻ����' }
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
