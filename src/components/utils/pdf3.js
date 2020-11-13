// import {periodPopDetailData, periodIncomeData, hisIncomeData, dealRecordData} from './mockData'
const calcHeight = (data) => {
	const pageSize = data && data.length > 0 ? data.length : 1;
	const height = 110 * pageSize;
	return { height, pageSize };
};

const createRandomHeight = (arr, num) => {
	console.log('createRandomHeight arr', arr);
	const n = num || parseInt(Math.random() * 20);
	const temp = [];
	for (let i = 0; i < n; i++) {
		// for(let j = 0;j < arr.length; j++){
		temp.push(arr[i]);
		// }
	}
	console.log('createRandomHeight temp', temp);
	return temp;
};

const periodPopDetailData = [
	{ vc_fundname: 'ghrth' },
	{ vc_fundname: 'tyhrtyertyert' },
	{ vc_fundname: 'yertyhert' },
	{ vc_fundname: 'tyhrtyertyert' },
	{ vc_fundname: 'yert' },
	{ vc_fundname: 'gfhdfghdfg' },
	{ vc_fundname: 'hdfgh' },

	{ vc_fundname: 'ghrth' },
	{ vc_fundname: 'tyhrtyertyert' },
	{ vc_fundname: 'yertyhert' },
	{ vc_fundname: 'tyhrtyertyert' },
	{ vc_fundname: 'yert' },
	{ vc_fundname: 'gfhdfghdfg' },
	{ vc_fundname: 'hdfgh' },
	{ vc_fundname: 'tyhrtyertyert' },
	{ vc_fundname: 'dhftghfgh' },
	{ vc_fundname: 'jgh' },
	{ vc_fundname: 'dfhgdf' },
	{ vc_fundname: 'hgjghdgfh' },
	{ vc_fundname: 'tyhrtyertdhfghfdgdhyert' },
	{ vc_fundname: 'tyhrtyerdhtyert' }
];
const periodIncomeData = [
	{ vc_fundcode: 'sdaeswfadhfghfghfdgewsf' },
	{ vc_fundcode: 'sdaeswfdhfghfgaewsf' },
	{ vc_fundcode: 'sdaeswhdfghfghfdghdfghfaewsf' },
	{ vc_fundcode: 'sdaeswfadfghfghfewsf' },
	{ vc_fundcode: 'sdaeswfaehdftgfwsf' },
	{ vc_fundcode: 'sdaeswfadfghfewsf' },

	{ vc_fundcode: 'sdaeswfadhfghfghfdgewsf' },

	{ vc_fundcode: 'sdaeswfadhfghfghfdgewsf' },
	{ vc_fundcode: 'sdaeswfaehdftgfwsf' },
	{ vc_fundcode: 'sdaeswfadfghfewsf' },
	{ vc_fundcode: 'sdaeswfdfghgffhdaewsf' },
	{ vc_fundcode: 'sdaeswfadhfghfghfdgewsf' },
	{ vc_fundcode: 'sdaeswfdhfghfgaewsf' },
	{ vc_fundcode: 'sdaeswhdfghfghfdghdfghfaewsf' },
	{ vc_fundcode: 'sdaeswfadfghfghfewsf' },
	{ vc_fundcode: 'sdaeswfaehdftgfwsf' },
	{ vc_fundcode: 'sdaeswfadfghfewsf' },
	{ vc_fundcode: 'sdaeswfdfghgffhdaewsf' },
	{ vc_fundcode: 'sdaeswfadhfghfghfdgewsf' },
	{ vc_fundcode: 'sdaeswfdhfghfgaewsf' },
	{ vc_fundcode: 'sdaeswhdfghfghfdghdfghfaewsf' }
];
const hisIncomeData = [
	{ vc_fundcode: 'dsfghdd' },
	{ vc_fundcode: 'dsfd' },
	{ vc_fundcode: 'dshdfghffd' },
	{ vc_fundcode: 'dsffgdhfgd' },
	{ vc_fundcode: 'dsfhfgdhfghgfd' },
	{ vc_fundcode: 'dsfghdd' },
	{ vc_fundcode: 'dsfd' },
	{ vc_fundcode: 'dshdfghffd' },
	{ vc_fundcode: 'dsffgdhfgd' },
	{ vc_fundcode: 'dsfhfgdhfghgfd' },
	{ vc_fundcode: 'dsfghdd' },
	{ vc_fundcode: 'dsfd' },
	{ vc_fundcode: 'dshdfghffd' },
	{ vc_fundcode: 'dsffgdhfgd' },
	{ vc_fundcode: 'dsfhfgdhfghgfd' },
	{ vc_fundcode: 'dsfghdd' },
	{ vc_fundcode: 'dsfd' },
	{ vc_fundcode: 'dshdfghffd' },
	{ vc_fundcode: 'dsffgdhfgd' },
	{ vc_fundcode: 'dsfhfgdhfghgfd' },
	{ vc_fundcode: 'dsfghdd' },
	{ vc_fundcode: 'dsfd' },
	{ vc_fundcode: 'dshdfghffd' },
	{ vc_fundcode: 'dsffgdhfgd' },
	{ vc_fundcode: 'dsfhfgdhfghgfd' },
	{ vc_fundcode: 'dsfdfghdfgh' }
];
const dealRecordData = [
	{ fundName: 'rygrshyyty' },
	{ fundName: 'rygrsthy' },
	{ fundName: 'rygrsertyftdftytfyftty' },
	{ fundName: 'rygrsthgfhfghy' },
	{ fundName: 'rygrsdfghfgty' },
	{ fundName: 'rygrshyyty' },
	{ fundName: 'rygrsthy' },
	{ fundName: 'rygrsertyftdftytfyftty' },
	{ fundName: 'rygrsthgfhfghy' },
	{ fundName: 'rygrsdfghfgty' },
	{ fundName: 'rygrshyyty' },
	{ fundName: 'rygrsthy' },
	{ fundName: 'rygrsertyftdftytfyftty' },
	{ fundName: 'rygrsthgfhfghy' },
	{ fundName: 'rygrsdfghfgty' },
	{ fundName: 'rygrshyyty' },
	{ fundName: 'rygrsthy' },
	{ fundName: 'rygrsertyftdftytfyftty' },
	{ fundName: 'rygrsthgfhfghy' },
	{ fundName: 'rygrsdfghfgty' },
	{ fundName: 'rygrshyyty' },
	{ fundName: 'rygrsthy' },
	{ fundName: 'rygrsertyftdftytfyftty' },
	{ fundName: 'rygrsthgfhfghy' },
	{ fundName: 'rygrsdfghfgty' },
	{ fundName: 'rygrshfghfdghty' }
];

const calcLayoutModule = (arr) => {
	console.log('arr2', arr);
	var pageHeight = 3025;
	var page = 1;
	var addPageHeight = 0;
	// 除了表头、合计 每页最多能放26
	var headFootHeight = 501;
	var maxSize = 26;
	var rowItemHeight = 110;
	var headerHeight = 110;

	function calcMaxAddSize(addPageHeight, size, item, page) {
		console.log('addPageHeight', addPageHeight);
		console.log('size', size);
		// 当前页剩余还能放多少条
		const curPageleftSize = Math.floor((pageHeight - addPageHeight - headerHeight) / rowItemHeight);

		// 需要多少页
		console.log('item.pageSize - curPageleftSize', item.pageSize, curPageleftSize);
		const needPageSize = Math.ceil((item.pageSize - curPageleftSize) / maxSize);

		// 除了增加的页数以外   增加的最后一页还有剩余多少条
		const lastPageLeftSize = item.pageSize - curPageleftSize - (needPageSize - 1) * maxSize;

		//   console.log("curPageleftSize", curPageleftSize)
		console.log('needPageSize', needPageSize);
		//   console.log("lastPageLeftSize", lastPageLeftSize)

		const calcAddInfoArr = calcAddPageInfo({
			needPageSize,
			curPageleftSize,
			lastPageLeftSize,
			item,
			page,
			addPageHeight
		});
		console.log('calcAddInfoArr', calcAddInfoArr);
		// console.log('calcAddInfoArr[calcAddInfoArr.length -1].calcPage', calcAddInfoArr[calcAddInfoArr.length -1].calcPage)
		// console.log("calcAddInfoArr[calcAddInfoArr.length -1].addPageHeight", calcAddInfoArr[calcAddInfoArr.length -1].addPageHeight)

		//   console.log("------------------")
		return {
			calcPage: calcAddInfoArr[calcAddInfoArr.length - 1].calcPage,
			cailcIsAdd: calcAddInfoArr[calcAddInfoArr.length - 1].isAdd,
			calcAddInfoArr,
			curPageleftSize,
			needPageSize,
			lastPageLeftSize,
			reAddPageHeight: calcAddInfoArr[calcAddInfoArr.length - 1].addPageHeight
		};
	}

	function calcAddPageInfo({ needPageSize, curPageleftSize, lastPageLeftSize, item, page, addPageHeight }) {
		let temp = [];
		let calcPage = page;
		// pageHeight -(lastPageLeftSize * rowItemHeight + headerHeight)
		// 需要的页数大于一页
		for (var i = 0; i <= needPageSize; i++) {
			console.log('-------------i');
			console.log('ii', i);
			let dynamicPageItem = {
				beganIndex: null,
				endIndex: null,
				calcPage: null,
				addPageHeight: null,
				isAdd: false,
				name: item.name
			};
			if (needPageSize > 1) {
				// 第一页剩余填补
				if (i == 0) {
					dynamicPageItem.beganIndex = 0;
					dynamicPageItem.endIndex = curPageleftSize - 1;
					dynamicPageItem.calcPage = calcPage;
					dynamicPageItem.addPageHeight = addPageHeight + curPageleftSize * rowItemHeight;
					dynamicPageItem.isAdd = false;
				} else if (i > 0 && i < needPageSize) {
					// 除了剩余的第一页和增加的最后一页
					dynamicPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
					dynamicPageItem.endIndex = curPageleftSize + maxSize * (i - 1) + maxSize;
					dynamicPageItem.calcPage = ++calcPage;
					console.log('calcPage2222', calcPage);
					dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicPageItem.isAdd = true;
					console.log('log1');
				} else {
					// 返回增加的最后一页的 第一行的索引 和 最后一行的索引
					console.log('last add debug', item);

					dynamicPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
					dynamicPageItem.endIndex = item.pageSize - 1;
					dynamicPageItem.calcPage = ++calcPage;
					console.log('calcPage333', calcPage);
					dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicPageItem.isAdd = true;
					console.log('log2');
				}
				temp.push(dynamicPageItem);
			}

			if (needPageSize === 1) {
				if (i == 0) {
					console.log('i === 0');
					dynamicPageItem.beganIndex = 0;
					dynamicPageItem.endIndex = curPageleftSize - 1;
					dynamicPageItem.calcPage = calcPage;
					dynamicPageItem.addPageHeight = addPageHeight + curPageleftSize * rowItemHeight;
					dynamicPageItem.isAdd = false;
				} else {
					console.log('i === 1');
					console.log('lastPageLeftSize', lastPageLeftSize);
					dynamicPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
					dynamicPageItem.endIndex = item.pageSize - 1;
					dynamicPageItem.calcPage = ++calcPage;
					dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicPageItem.isAdd = true;
				}

				console.log('dynamicPageItem', dynamicPageItem);
				temp.push(dynamicPageItem);
			}
		}
		console.log('temp', temp);
		return temp;
	}

	const calcArrStep1 = arr.map((item, index) => {
		let addInfoArr = [];
		let isAdd = false;
		if (arr[index]) {
			if (addPageHeight + arr[index].height > pageHeight) {
				if (arr[index].type) {
					// 动态组件
					const {
						// curPageleftSize,
						// needPageSize,
						calcAddInfoArr,
						// lastPageLeftSize,
						cailcIsAdd,
						reAddPageHeight,
						calcPage
					} = calcMaxAddSize(addPageHeight, arr[index].pageSize, item, page);
					page = calcPage;
					console.log('page', page);
					addPageHeight = reAddPageHeight;
					addInfoArr = calcAddInfoArr;
				} else {
					isAdd = true;
					page++;
					addPageHeight = arr[index].height;
				}
			} else {
				addPageHeight = addPageHeight + arr[index].height;
				isAdd = false;
			}
		}
		item.isAdd = isAdd;
		item.addInfoArr = addInfoArr;
		item.page = page;
		item.addPageHeight = addPageHeight;
		return item;
	});

	const calcArrStep3 = [];
	calcArrStep1.forEach((m) => {
		if (m.addInfoArr.length > 0) {
			calcArrStep3.push(...m.addInfoArr);
		} else {
			calcArrStep3.push(m);
		}
	});
	console.log('calcArrStep3', calcArrStep3);
	const calcArrStep4 = calcArrStep3.map((m) => {
		if (m.calcPage) {
			m.page = m.calcPage;
		}
		return m;
	});
	console.log('calcArrStep4', calcArrStep4);

	let map = new Map();
	let transRes = [];
	calcArrStep4.forEach((item) => {
		map.has(item.page) ? map.get(item.page).push(item) : map.set(item.page, [ item ]);
	});
	transRes = [ ...map.values() ];

	console.log('transRes', transRes);
	return transRes;
};
//   for(let i = 0;i < calcArrStep4.length; i++) {
// 		transRes[i] = []
// 		for(let j = 0;j < calcArrStep4.length; j++) {
// 		  if(calcArrStep4[j].page === i +1 && calcArrStep4[j]){
// 			transRes[i][j] = calcArrStep4[j]
// 		  }
// 		}
// 	  }
const moduleDataArr = [
	{
		height: 711,
		name: 'TerminalAsset',
		tbName: 'module1',
		title: '期末持仓',
		type: 0 // 动态组件1 非动态组件0
		//   dataObj: this.moduleA,
		//   ...this.moduleA
	},
	{
		height: calcHeight(periodPopDetailData).height,
		name: 'TableContainer',
		tbName: 'module2',
		title: '期末持仓明细',
		pageSize: calcHeight(periodPopDetailData).pageSize,
		type: 1
		//   dataObj: this.moduleB,
		//   ...this.moduleB,
		//   columnAttr: detailTableColumn
	},
	{
		height: 745,
		tbName: 'module3',
		title: '资产增长图',
		name: 'AssetIncrease',
		type: 0
		//   dataObj:  this.moduleC,
		//   ...this.moduleC
	},
	{
		height: calcHeight(periodIncomeData).height,
		name: 'TableContainer',
		tbName: 'module4',
		title: '区间盈亏明细',
		pageSize: calcHeight(periodIncomeData).pageSize,
		type: 1
		//   dataObj: this.moduleD,
		//   ...this.moduleD,
		//   columnAttr: periodIncomeColumn
	},
	{
		height: calcHeight(hisIncomeData).height,
		name: 'TableContainer',
		tbName: 'module5',
		title: '历史退出产品回报明细',
		pageSize: calcHeight(hisIncomeData).pageSize,
		type: 1
		//   data: this.moduleE,
		//   ...this.moduleE,
		//   columnAttr: hisIncomeColumn
	},
	{
		height: calcHeight(dealRecordData).height,
		name: 'TableContainer',
		tbName: 'module6',
		title: '期间交易记录',
		pageSize: calcHeight(dealRecordData).pageSize,
		type: 1
		//   data: this.moduleF,
		//   ...this.moduleF,
		//   columnAttr: dealRecordColumn
	}
];

const moduleCalcRes = calcLayoutModule(moduleDataArr);
console.log('moduleCalcRes', moduleCalcRes);
