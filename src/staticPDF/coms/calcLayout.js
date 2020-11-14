/* eslint-disable no-debugger */
// 重新起新的table mt 501
// 起当前的table mt 100 + bom 110 + 1条 110 + 是否有合计 110
const tbHeaderOffsetTop = 401;
const rowItemHeight = 110;
const headerHeight = 110;
const bomTableHeight = 110;
const pageHeight = 3025;
const maxSize = 26; // 26.5
const mtMaxSize = 21; // 22.9

const titleMarginTop = 200;
const titleHeight = 86;
const tipHeight_add_MarginTop = 65;
const table_marginTop = 50;
const sumerryHeight = 110;
// const ramDomNum = 200
// 200 table container marginTop
// 86 title height
// 65 注释 height + marginTop
// 50 talbe marginTop
// 110 ?是否有合计
// 110 表头
import { cloneDeep } from 'lodash';
export const calcLayoutModule = (moduleArr) => {

	// 走新table分页逻辑
	function calcNewTable(newTableItemParam, page) {
		const cloneNewItem = cloneDeep(newTableItemParam);
		let calcPage = cloneDeep(page);
		console.log('calcNewTable11 item', cloneNewItem);
		console.log('calcNewTable11 page', page);
		let tempTbArr = [];
		let dynamicNewTbItem = {
			beganIndex: 0,
			endIndex: 0,
			calcPage: 0,
			addPageHeight: null,
			isAdd: false,
			name: '',
			dataObj: {}
		};
		if (cloneNewItem.pageSize < mtMaxSize) {
			dynamicNewTbItem.beganIndex = 0;
			dynamicNewTbItem.endIndex = cloneNewItem.pageSize;
			dynamicNewTbItem.calcPage = ++calcPage;
			dynamicNewTbItem.isAdd = true;
			dynamicNewTbItem.name = cloneNewItem.name;
			dynamicNewTbItem.addPageHeight = minSizeHeight(cloneNewItem.size);
			dynamicNewTbItem.dataObj = cloneDeep(cloneNewItem.dataObj);
			tempTbArr.push(dynamicNewTbItem);
		} else {
			const sizeNum = Math.ceil((cloneNewItem.pageSize - 21) / 26 + 1);

			if (sizeNum > 2) {
				// 234
				for (let numTFlag = 0; numTFlag < sizeNum; numTFlag++) {
					if (numTFlag === 0) {
						dynamicNewTbItem.beganIndex = 0;
						dynamicNewTbItem.endIndex = mtMaxSize;
						dynamicNewTbItem.calcPage = ++calcPage;
						dynamicNewTbItem.isAdd = true;
						dynamicNewTbItem.name = cloneNewItem.name;
						dynamicNewTbItem.addPageHeight = 2915; // 无所谓
						dynamicNewTbItem.dataObj = cloneDeep(cloneNewItem.dataObj);
					} else if (numTFlag > 0 && numTFlag < sizeNum - 1) {
						dynamicNewTbItem.beganIndex = mtMaxSize + maxSize * (numTFlag - 1);
						dynamicNewTbItem.endIndex = mtMaxSize + maxSize * numTFlag;
						dynamicNewTbItem.calcPage = ++calcPage;
						dynamicNewTbItem.isAdd = true;
						dynamicNewTbItem.name = cloneNewItem.name;
						dynamicNewTbItem.addPageHeight = 2915; // 无所谓
						dynamicNewTbItem.dataObj = cloneDeep(cloneNewItem.dataObj);
					} else {
						const lastPageLeftSize = cloneNewItem.pageSize - mtMaxSize - (numTFlag - 1) * maxSize;
						dynamicNewTbItem.beganIndex = cloneNewItem.pageSize - lastPageLeftSize;
						dynamicNewTbItem.endIndex = cloneNewItem.pageSize - 1;
						dynamicNewTbItem.calcPage = ++calcPage;
						dynamicNewTbItem.isAdd = true;
						dynamicNewTbItem.name = cloneNewItem.name;
						dynamicNewTbItem.addPageHeight = newTableLeftPage_addPageHeight({
							item: cloneNewItem,
							lastPageLeftSize
						});
						dynamicNewTbItem.dataObj = cloneDeep(cloneNewItem.dataObj);
					}
					tempTbArr.push(dynamicNewTbItem);
				}
			} else {
				// 1 2,
				for (let numBAflag = 0; numBAflag < sizeNum; numBAflag++) {
					const lastPageLeftSize = cloneNewItem.pageSize - mtMaxSize;
					if (numBAflag === 0) {
						dynamicNewTbItem.beganIndex = 0;
						dynamicNewTbItem.endIndex = mtMaxSize;
						dynamicNewTbItem.calcPage = ++calcPage;
						dynamicNewTbItem.isAdd = true;
						dynamicNewTbItem.name = cloneNewItem.name;
						dynamicNewTbItem.addPageHeight = 2915; // 无所谓
						dynamicNewTbItem.dataObj = cloneDeep(cloneNewItem.dataObj);
					} else {
						dynamicNewTbItem.beganIndex = mtMaxSize;
						dynamicNewTbItem.endIndex = cloneNewItem.pageSize - 1;
						dynamicNewTbItem.calcPage = ++calcPage;
						dynamicNewTbItem.isAdd = true;
						dynamicNewTbItem.name = cloneNewItem.name;
						dynamicNewTbItem.addPageHeight = newTableLeftPage_addPageHeight({
							item: cloneNewItem,
							lastPageLeftSize
						});
						dynamicNewTbItem.dataObj = cloneDeep(cloneNewItem.dataObj);
					}
					tempTbArr.push(dynamicNewTbItem);
				}
			}
		}

		cloneNewItem.calcAddInfoArr = tempTbArr;
		cloneNewItem.reAddPageHeight = tempTbArr[tempTbArr.length - 1].addPageHeight;
		cloneNewItem.calcPage = tempTbArr[tempTbArr.length - 1].page;
		console.log('calcNewTable item', cloneNewItem);
		return cloneNewItem;
	}

	function calcAddPageInfo({ needPageSize, curPageleftSize, lastPageLeftSize, item, page, addPageHeight }) {
		let tempInfoArr = [];
		console.log('calcAddPageInfo page ----', page);
		let calcPage = page;
		// pageHeight -(lastPageLeftSize * rowItemHeight + headerHeight)
		// 需要的页数大于一页
		for (var i = 0; i <= needPageSize; i++) {
			let dynamicAddPageItem = {
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
					dynamicAddPageItem.beganIndex = 0;
					dynamicAddPageItem.endIndex = curPageleftSize - 1;
					dynamicAddPageItem.calcPage = calcPage;
					dynamicAddPageItem.addPageHeight = addPageHeight + curPageleftSize * rowItemHeight;
					dynamicAddPageItem.isAdd = false;
					dynamicAddPageItem.type = 1;
					dynamicAddPageItem.name = 'TableContainer';
					dynamicAddPageItem.dataObj.showSummary = false;
				} else if (i > 0 && i < needPageSize) {
					// 除了剩余的第一页和增加的最后一页
					dynamicAddPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
					dynamicAddPageItem.endIndex = curPageleftSize + maxSize * (i - 1) + maxSize;
					dynamicAddPageItem.calcPage = ++calcPage;
					console.log('calcPage2222', calcPage);
					dynamicAddPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicAddPageItem.isAdd = true;
					dynamicAddPageItem.type = 1;
					dynamicAddPageItem.name = 'addTableContainer';
					dynamicAddPageItem.dataObj.showSummary = false;
					console.log('log1');
				} else {
					// 返回增加的最后一页的 第一行的索引 和 最后一行的索引
					console.log('last add debug', item);

					dynamicAddPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
					dynamicAddPageItem.endIndex = item.pageSize - 1;
					dynamicAddPageItem.calcPage = ++calcPage;
					console.log('calcPage333', calcPage);
					dynamicAddPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicAddPageItem.isAdd = true;
					dynamicAddPageItem.type = 1;
					dynamicAddPageItem.name = 'addTableContainer';
					dynamicAddPageItem.dataObj.showSummary = true;
					console.log('log2');
				}
				tempInfoArr.push(dynamicAddPageItem);
			}

			if (needPageSize === 1) {
				console.log('jia2222');
				if (i == 0) {
					console.log('i === 0');
					dynamicAddPageItem.beganIndex = 0;
					dynamicAddPageItem.endIndex = curPageleftSize - 1;
					dynamicAddPageItem.calcPage = calcPage;
					dynamicAddPageItem.addPageHeight = addPageHeight + curPageleftSize * rowItemHeight;
					dynamicAddPageItem.isAdd = false;
					dynamicAddPageItem.type = 1;
					dynamicAddPageItem.name = 'TableContainer';
					dynamicAddPageItem.dataObj.showSummary = false;
				} else {
					console.log('i === 1');
					console.log('lastPageLeftSize', lastPageLeftSize);
					dynamicAddPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
					dynamicAddPageItem.endIndex = item.pageSize - 1;
					dynamicAddPageItem.calcPage = ++calcPage;
					dynamicAddPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
					dynamicAddPageItem.isAdd = true;
					dynamicAddPageItem.type = 1;
					dynamicAddPageItem.name = 'addTableContainer';
					dynamicAddPageItem.dataObj.showSummary = true;
				}

				console.log('dynamicAddPageItem', dynamicAddPageItem);
				tempInfoArr.push(dynamicAddPageItem);
			}
		}
		console.log('tempInfoArr', tempInfoArr);
		return tempInfoArr;
	}

	function calcMaxAddSize(addPageHeight, size, db1Dataitem, pageSizeNum) {
		const calcDB1AddSizeItem = cloneDeep(db1Dataitem)
		console.log('addPageHeight', addPageHeight);
		console.log('size', size);
		console.log('calcMaxAddSize page', pageSizeNum);

		// 当前页剩余还能放多少条,需要根据是不是新table， 是 501 ，不是
		const curPageleftSize = canAddSize({ addPageHeight, calcDB1AddSizeItem: calcDB1AddSizeItem });
		console.log('curPageleftSize', curPageleftSize);
		const needPageSize = Math.ceil((calcDB1AddSizeItem.pageSize - curPageleftSize) / maxSize);

		// 除了增加的页数以外   增加的最后一页还有剩余多少条
		const lastPageLeftSize = calcDB1AddSizeItem.pageSize - curPageleftSize - (needPageSize - 1) * maxSize;

		const calcAddInfoArrTemp = calcAddPageInfo({
			needPageSize,
			curPageleftSize,
			lastPageLeftSize,
			item: calcDB1AddSizeItem,
			pageSizeNum,
			addPageHeight,
			isNewTb: false
		});
		console.log('calcAddInfoArrTemp', calcAddInfoArrTemp);

		return {
			calcPage: calcAddInfoArrTemp[calcAddInfoArrTemp.length - 1].calcPage,
			cailcIsAdd: calcAddInfoArrTemp[calcAddInfoArrTemp.length - 1].isAdd,
			calcAddInfoArr:calcAddInfoArrTemp,
			curPageleftSize,
			needPageSize,
			lastPageLeftSize,
			reAddPageHeight: calcAddInfoArrTemp[calcAddInfoArrTemp.length - 1].addPageHeight
		};
	}

	// ....
	function calcPageSplit(arr) {
		const cloneSpliteArr = cloneDeep(arr);
		let calcPageNum = 1;
		let addPageHeight = 0;
		let splitTemp = cloneSpliteArr.map((splitItem, index) => {
			let addInfoArr = [];
			let isAdd = false;
			let needPageSizeInit = 0;
			let curPageleftSizeInit = 0;
			if (arr[index]) {
				if (addPageHeight + arr[index].height > pageHeight) {
					if (arr[index].type) {
						console.log('arr[index].type');
						// 动态组件 不够放，判断能不能放下最小3条的带头的动态组件

						// if(pageHeight - addPageHeight >  minSizeHeight(3))

						// if (addPageHeight + minSizeHeight(3)  > pageHeight) {
						console.log('chuan page', calcPageNum);
						if (pageHeight - addPageHeight > minSizeHeight(3) + 300) {
							const {
								curPageleftSize,
								needPageSize,
								calcAddInfoArr,
								// lastPageLeftSize,
								reAddPageHeight,
								calcPage
							} = calcMaxAddSize(addPageHeight, arr[index].pageSize, splitItem, calcPageNum);
							// 动态组件
							curPageleftSizeInit = curPageleftSize;
							needPageSizeInit = needPageSize;
							calcPageNum = calcPage;
							console.log('calcPageNum', calcPageNum);
							addPageHeight = reAddPageHeight;
							addInfoArr = calcAddInfoArr;
						} else {
							console.log('calcNewTable item', splitItem);
							// 新table重新起步
							const { calcPage, reAddPageHeight, calcAddInfoArr } = calcNewTable(splitItem, calcPageNum);
							calcPageNum = calcPage;
							console.log('page', calcPageNum);
							addPageHeight = reAddPageHeight;
							addInfoArr = calcAddInfoArr;
						}
					} else {
						isAdd = true;
						calcPageNum++;
						addPageHeight = arr[index].height;
					}
				} else {
					addPageHeight = addPageHeight + arr[index].height;
					isAdd = false;
				}
			}
			splitItem.curPageleftSize = curPageleftSizeInit;
			splitItem.needPageSize = needPageSizeInit;
			splitItem.isAdd = isAdd;
			splitItem.addInfoArr = addInfoArr;
			splitItem.page = calcPageNum;
			splitItem.addPageHeight = addPageHeight;
			return splitItem;
		});
		return splitTemp;
	}

	const calcArrStep1 = cloneDeep(calcPageSplit(moduleArr));
	console.log('calcArrStep1', calcArrStep1);
	const calcArrStep3 = [];
	calcArrStep1.forEach((calcArrStep1Item) => {
		if (calcArrStep1Item.addInfoArr.length > 0) {
			calcArrStep3.push(...calcArrStep1Item.addInfoArr);
		} else {
			calcArrStep3.push(calcArrStep1Item);
		}
	});
	console.log('calcArrStep3', calcArrStep3);
	const calcArrStep4 = calcArrStep3.map((calcArrStep3Item) => {
		if (calcArrStep3Item.calcPage) {
			calcArrStep3Item.page = calcArrStep3Item.calcPage;
		}
		if (
			(calcArrStep3Item.beganIndex === 0 &&
				calcArrStep3Item.endIndex &&
				calcArrStep3Item.dataObj &&
				calcArrStep3Item.dataObj.tbData) ||
			(calcArrStep3Item.beganIndex &&
				calcArrStep3Item.endIndex &&
				calcArrStep3Item.dataObj &&
				calcArrStep3Item.dataObj.tbData)
		) {
			calcArrStep3Item.dataObj.tbData = sliceTbData({
				beganIndex: calcArrStep3Item.beganIndex,
				endIndex: calcArrStep3Item.endIndex,
				sliceData: calcArrStep3Item.dataObj.tbData
			});
		}
		return calcArrStep3Item;
	});
	console.log('calcArrStep4', calcArrStep4);

	let map = new Map();
	let transRes = [];
	calcArrStep4.forEach((calcArrStep4Item) => {
		map.has(calcArrStep4Item.page)
			? map.get(calcArrStep4Item.page).push(calcArrStep4Item)
			: map.set(calcArrStep4Item.page, [ calcArrStep4Item ]);
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
	// console.log('calcHeight data--', data)
	// 200 table container marginTop
	// 86 title height
	// 65 注释 height + marginTop
	// 50 talbe marginTop
	// 110 ?是否有合计
	// 110 表头
	const pageSize = data && data.tbData.length > 0 ? data.tbData.length : 1;
	const height =
		pageInfoMarginTitleTipHeight() +
		headerHeight +
		bomTableHeight +
		rowItemHeight * pageSize +
		(data.tbData.showSummary ? bomTableHeight : 0);
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
	const n = num || parseInt(Math.random() * 20);
	const temp = [];
	for (let i = 0; i < n; i++) {
		temp.push(arr[i]);
	}
	console.log('createRandomHeight temp', temp);
	return temp;
};

export const canAddSize = ({ calcDB1AddSizeItem, addPageHeight }) => {
	const calcDB2cAddSizeItem = cloneDeep(calcDB1AddSizeItem)
	const height = beganMinHeight(calcDB2cAddSizeItem);
	const unHeight = unBeganMinHeight();
	console.log('height---', height);
	let sizeDB1Num = 0;
	if (calcDB2cAddSizeItem.isNewTable) {
		sizeDB1Num = Math.floor((pageHeight - addPageHeight - height) / rowItemHeight);
	} else {
		sizeDB1Num = Math.floor((pageHeight - addPageHeight - unHeight) / rowItemHeight);
	}
	console.log('sizeDB1Num---', sizeDB1Num);
	return sizeDB1Num;
};

export const newTableMinHeight = () => {
	return pageInfoMarginTitleTipHeight() + 110 + 110;
};

// 计算n 条数据单独新的 只有一页 动态table的高度（n < 21）
export const minSizeHeight = (num) => {
	return pageInfoMarginTitleTipHeight() + 110 + 110 + 110 * num;
};

// mark 合计
export const unBeganMinHeight = () => {
	return 110 + 110;
};

// 计算剩余还能添加多少条用到的高度
export const beganMinHeight = () => {
	return pageInfoMarginTitleTipHeight() + 110 + 110;
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

export const pageInfoMarginTitleTipHeight = () => {
	// 86 title height
	// 65 注释 height + marginTop
	// 50 talbe marginTop
	// 110 ?是否有合计
	// 100 表头
	// 110 至少一条数据
	// 200 + 86 + 65 + 50 + 110 + 110;
	return titleMarginTop + titleHeight + tipHeight_add_MarginTop + table_marginTop;
};

export const staticHeight_hasSummary = ({ item }) => {
	return pageInfoMarginTitleTipHeight() + item && item.showSummary ? sumerryHeight : 0;
};

// 新table 最后一页的 addPageHeight
export const newTableLeftPage_addPageHeight = ({ item, lastPageLeftSize }) => {
	return staticHeight_hasSummary({ item }) + lastPageLeftSize * rowItemHeight;
};
