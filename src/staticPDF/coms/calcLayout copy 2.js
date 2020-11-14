/* eslint-disable no-debugger */
// 重新起新的table mt 501
// 起当前的table mt 100 + bom 110 + 1条 110 + 是否有合计 110
const tbHeaderOffsetTop = 401;
const rowItemHeight = 110;
const headerHeight = 110;
const bomTableHeight = 110;
const pageHeight = 2895;
const maxSize = 25; // 26.5
const mtMaxSize = 21; // 22.9
// 200 table container marginTop
// 86 title height
// 65 注释 height + marginTop
// 50 talbe marginTop
// 110 ?是否有合计
// 110 表头
const emptyAddTableHeight = 511; // 200 + 86 + 65 + 50 + 110
import { cloneDeep } from 'lodash';
export const calcLayoutModule = (arr) => {
	console.log('arr2', arr);
	var page = 1;
	var addPageHeight = 0;
	// 除了表头、合计 每页最多能放26
	// 200 86 65 50

	function calcMaxAddSize(addPageHeight, size, item, page) {
		console.log('addPageHeight', addPageHeight);
		console.log('size', size);


			// 当前页剩余还能放多少条,需要根据是不是新table， 是 501 ，不是
		const	curPageleftSize = canAddSize({ addPageHeight, item });
			// if(item.tbName === 'module4'){
			console.log('curPageleftSize module4', curPageleftSize);
			// }
			// if(curPageleftSize > 1) {
			// 需要多加一个判断 是新加页的
			// 需要多少页
			const needPageSize = Math.ceil((item.pageSize - curPageleftSize) / calcMaxSize(item));

			// 除了增加的页数以外   增加的最后一页还有剩余多少条
			const lastPageLeftSize = item.pageSize - curPageleftSize - (needPageSize - 1) * calcMaxSize(item);

			//   console.log("curPageleftSize", curPageleftSize)
			console.log('needPageSize', needPageSize);
			//   console.log("lastPageLeftSize", lastPageLeftSize)

		const calcAddInfoArr = calcAddPageInfo({
			needPageSize,
			curPageleftSize,
			lastPageLeftSize,
			item,
			page,
			addPageHeight,
			isNewTb: false
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

		// } else {
		// 	page = page + 1
		// 	const v = {
		// 		calcPage:page,
		// 		reAddPageHeight: calcAddPageHeight(item),
		// 		calcAddInfoArr: []
		// 	}
		// 	console.log('vvv',v)
		// 	return v
		// }
	}
	// isNewTb 用来控制  page ++
	function calcAddPageInfo({ needPageSize, curPageleftSize, lastPageLeftSize, item, page, addPageHeight, isNewTb }) {

		let temp = [];
		let calcPage = page;
		// pageHeight -(lastPageLeftSize * rowItemHeight + headerHeight)
		// 需要的页数大于一页
		for (var i = 0; i <= needPageSize; i++) {
			let dynamicPageItem = {
				beganIndex: null,
				endIndex: null,
				calcPage: null,
				addPageHeight: null,
				isAdd: false,
				name: item.name,
				dataObj: cloneDeep(item.dataObj)
			};
			if (needPageSize > 1) {
				// 第一页剩余填补
				if (i == 0) {
					console.log('jia111');
					dynamicPageItem.beganIndex = 0;
					dynamicPageItem.endIndex = curPageleftSize - 1;
					dynamicPageItem.calcPage = calcPage;
					dynamicPageItem.addPageHeight = addPageHeight + curPageleftSize * rowItemHeight;
					dynamicPageItem.isAdd = false;
					dynamicPageItem.type = 1;
					dynamicPageItem.name = 'TableContainer';
					dynamicPageItem.dataObj.showSummary = false;
				} else if (i > 0 && i < needPageSize) {
					// 除了剩余的第一页和增加的最后一页
					dynamicPageItem.beganIndex = curPageleftSize + calcMaxSize(item) * (i - 1);
					dynamicPageItem.endIndex = curPageleftSize + calcMaxSize(item) * (i - 1) + calcMaxSize(item);
					dynamicPageItem.calcPage = ++calcPage;
					console.log('calcPage2222', calcPage);
					dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicPageItem.isAdd = true;
					dynamicPageItem.type = 1;
					dynamicPageItem.name = 'addTableContainer';
					dynamicPageItem.dataObj.showSummary = false;
					console.log('log1');
				} else {
					// 返回增加的最后一页的 第一行的索引 和 最后一行的索引
					console.log('last add debug', item);

					dynamicPageItem.beganIndex = curPageleftSize + calcMaxSize(item) * (i - 1);
					dynamicPageItem.endIndex = item.pageSize - 1;
					dynamicPageItem.calcPage = ++calcPage;
					console.log('calcPage333', calcPage);
					dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicPageItem.isAdd = true;
					dynamicPageItem.type = 1;
					dynamicPageItem.name = 'addTableContainer';
					dynamicPageItem.dataObj.showSummary = true;
					console.log('log2');
				}
				temp.push(dynamicPageItem);
			}

			if (needPageSize === 1) {
				console.log('jia2222');
				if (i == 0) {
					console.log('i === 0');
					dynamicPageItem.beganIndex = 0;
					dynamicPageItem.endIndex = curPageleftSize - 1;
					dynamicPageItem.calcPage = calcPage;
					dynamicPageItem.addPageHeight = addPageHeight + curPageleftSize * rowItemHeight;
					dynamicPageItem.isAdd = false;
					dynamicPageItem.type = 1;
					dynamicPageItem.name = 'TableContainer';
					dynamicPageItem.dataObj.showSummary = false;
				} else {
					console.log('i === 1');
					console.log('lastPageLeftSize', lastPageLeftSize);
					dynamicPageItem.beganIndex = curPageleftSize + calcMaxSize(item) * (i - 1);
					dynamicPageItem.endIndex = item.pageSize - 1;
					dynamicPageItem.calcPage = ++calcPage;
					dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicPageItem.isAdd = true;
					dynamicPageItem.type = 1;
					dynamicPageItem.name = 'addTableContainer';
					dynamicPageItem.dataObj.showSummary = true;
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
		let needPageSizeInit = 0;
		let curPageleftSizeInit = 0;
		if (arr[index]) {
			if (addPageHeight + arr[index].height > pageHeight) {
				if (arr[index].type) {
					console.log('arr[index].type');
					// 动态组件 不够放，判断能不能放下最小1条的带头的动态组件
					if (addPageHeight + newTableMinHeight(item) < pageHeight) {
						const {
							curPageleftSize,
							needPageSize,
							calcAddInfoArr,
							// lastPageLeftSize,
							reAddPageHeight,
							calcPage
						} = calcMaxAddSize(addPageHeight, arr[index].pageSize, item, page);
						// 动态组件
						curPageleftSizeInit = curPageleftSize;
						needPageSizeInit = needPageSize;
						page = calcPage;
						console.log('page', page);
						addPageHeight = reAddPageHeight;
						addInfoArr = calcAddInfoArr;
					} else {
						// 加个判断 能不能放下当前新的动态组件
						if (addPageHeight + arr[index].height > pageHeight) {
							const {
								// curPageleftSize,
								// needPageSize,
								calcAddInfoArr,
								// lastPageLeftSize,
								reAddPageHeight,
								calcPage
							} = calcNewTable(beganMinHeight(),item, page); // 是新table
							addInfoArr = calcAddInfoArr;
							isAdd = true;
							page = calcPage;
							addPageHeight = reAddPageHeight; // 只满足新加的table条数不大于一页
						} else {
							isAdd = true;
							page++;
							addPageHeight = arr[index].height;
						}
					}
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
		item.curPageleftSize = curPageleftSizeInit;
		item.needPageSize = needPageSizeInit;
		item.isAdd = isAdd;
		item.addInfoArr = addInfoArr;
		item.page = page;
		item.addPageHeight = addPageHeight;
		return item;
	});

	calcNewTable(newAddPageHeight,item, page) {
		const size = calcMaxSize(item) // 每页多少
		const  needPageSize = Math.ceil(item.pageSize /size ) // 需要的页数
		const curPageleftSize = 0
		const lastPageLeftSize = item.pageSize
		const addPageHeight = 0
		calcAddPageInfo({ needPageSize, curPageleftSize, lastPageLeftSize, item, page, addPageHeight })
	}

	// function calcNewTable(newAddPageHeight,item, page) {
	// 	console.log("calcNewTable item", item)

	// 	let temp = []
	// 	const  needPageSize = Math.ceil(item.pageSize /size ) // 需要的页数
	// 	// const reAddPageHeight =
	// 	let tempPage = page
	// 	for(let i = 0;i < needPageSize;i ++){
	// 	let dynamicPageItem = {
	// 		beganIndex: 0 + size * i,
	// 		endIndex: null,
	// 		calcPage: ++page,
	// 		addPageHeight: null,
	// 		isAdd: false,
	// 		name: item.name,
	// 		dataObj: cloneDeep(item.dataObj)
	// 	};
	// 	 tempPage = tempPage + 1
	// 	temp.push(dynamicPageItem)
	// 	}
	// 	// needPageSizeInit = needPageSize;
	// 	item.curPageleftSizeInit = 0
	// 	item.needPageSizeInit = calcPageSize
	// 	item.calcPage = tempPage
	// 	item.addInfoArr = temp
	// 	item.reAddPageHeight = 0
	// }

	console.log('calcArrStep1', calcArrStep1);
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
			// mark
		}
		if (
			(m.beganIndex === 0 && m.endIndex && m.dataObj && m.dataObj.tbData) ||
			(m.beganIndex && m.endIndex && m.dataObj && m.dataObj.tbData)
		) {
			m.dataObj.tbData = sliceTbData({
				beganIndex: m.beganIndex,
				endIndex: m.endIndex,
				sliceData: m.dataObj.tbData
			});
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

// 计算当前新开页面的 pageHeight
export const calcAddPageHeight = (item) => {
	let n = 0;
	// 是否大于最大条数 是否有summerry
	if (item.isNewTable) {
		n = tbHeaderOffsetTop + headerHeight + bomTableHeight + rowItemHeight * item.pageSize;
		return Number(n);
	}
};

// 计算全table的高度
export const calcHeight = (data) => {
	const pageSize = data && data.length > 0 ? data.length : 1;
	const height = tbHeaderOffsetTop + headerHeight + bomTableHeight + rowItemHeight * pageSize;
	return { height, pageSize };
};

// 计算最小需要多少空间
export const calcMinHeight = () => {
	const minSize = 1; // 剩余空间 可以至少放1条
	const minHeight = tbHeaderOffsetTop + headerHeight + bomTableHeight + rowItemHeight * minSize;
	console.log('minHeight', minHeight);
	return minHeight;
};

export const createRandomHeight = (arr, num) => {
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

export const canAddSize = ({ addPageHeight, item }) => {
	const n = beganMinHeight(item);
	console.log('n---', n);
	const m = Math.floor((pageHeight - addPageHeight - n - 220) / rowItemHeight);
	console.log('m---', m);
	return m;
};

export const newTableMinHeight = (item) => {
	// 200 table container marginTop
	// 86 title height
	// 65 注释 height + marginTop
	// 50 talbe marginTop
	// 110 ?是否有合计
	// 110 表头
	// 110 至少一条数据
	if (item.showSummary) {
		//721
		return 200 + 86 + 65 + 50 + 110 + 110 + 110 + 200;
	} else {
		// 611
		return 200 + 86 + 65 + 50 + 100 + 110 + 200;
	}
};

// 计算剩余还能添加多少条用到的高度
export const beganMinHeight = () => {
	// 200 table container marginTop
	// 86 title height
	// 65 注释 height + marginTop
	// 50 talbe marginTop
	// 110 ?是否有合计
	// 100 表头
	// 110 至少一条数据

	return 200 + 86 + 65 + 50 + 110;
};

export const calcMaxSize = (item) => {
	if (item.isNewTable) {
		return mtMaxSize;
	} else {
		return maxSize;
	}
};

export const sliceTbData = ({ beganIndex, endIndex, sliceData }) => {
	const temp = cloneDeep(sliceData);
	if (beganIndex === endIndex) {
		return temp.slice(beganIndex);
	}
	return temp.slice(beganIndex, endIndex + 1);
};
