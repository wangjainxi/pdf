// 501 + 110 * this.periodPopDetail.length
function createRandomHeight(size) {
	const pageSize = size || parseInt(Math.random() * 65);
	const height = 501 + 110 * pageSize;
	return { height, pageSize };
}

var arr = [
	{
		height: 711,
		name: 'm1',
		type: 0 // 动态组件1 非动态组件0
	},
	{
		height: createRandomHeight(7).height,
		name: 'm2',
		pageSize: createRandomHeight(7).pageSize,
		type: 1
	},
	{
		height: 745,
		name: 'm3',
		type: 0
	},
	{
		height: createRandomHeight(56).height,
		name: 'm4',
		pageSize: createRandomHeight(56).pageSize,
		type: 1
    },
    {
		height: createRandomHeight(56).height,
		name: 'm5',
		pageSize: createRandomHeight(56).pageSize,
		type: 1
    },
    {
		height: createRandomHeight(56).height,
		name: 'm5',
		pageSize: createRandomHeight(56).pageSize,
		type: 1
    },
];
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
			addPageHeight: null
		};
		if (needPageSize > 1) {
			// 第一页剩余填补
			if (i == 0) {
				dynamicPageItem.beganIndex = 0;
				dynamicPageItem.endIndex = curPageleftSize - 1;
				dynamicPageItem.calcPage = calcPage;
				dynamicPageItem.addPageHeight = addPageHeight + curPageleftSize * rowItemHeight;
			} else if (i > 0 && i < needPageSize) {
				// 除了剩余的第一页和增加的最后一页
				dynamicPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
				dynamicPageItem.endIndex = curPageleftSize + maxSize * (i - 1) + maxSize;
				dynamicPageItem.calcPage = ++calcPage;
				console.log('calcPage2222', calcPage);
				dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
				console.log('log1');
			} else {
				// 返回增加的最后一页的 第一行的索引 和 最后一行的索引
				console.log('last add debug', item);

				dynamicPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
				dynamicPageItem.endIndex = item.pageSize - 1;
				dynamicPageItem.calcPage = ++calcPage;
				console.log('calcPage333', calcPage);
				dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
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
			} else {
				console.log('i === 1');
				console.log('lastPageLeftSize', lastPageLeftSize);
				dynamicPageItem.beganIndex = curPageleftSize + maxSize * (i - 1);
				dynamicPageItem.endIndex = item.pageSize - 1;
				dynamicPageItem.calcPage = ++calcPage;
				dynamicPageItem.addPageHeight = lastPageLeftSize * rowItemHeight + headerHeight;
			}

			console.log('dynamicPageItem', dynamicPageItem);
			temp.push(dynamicPageItem);
		}
	}
	console.log('temp', temp);
	return temp;
}

arr.map((item, index) => {
	var temp = [];
	// let addPageArr = []
	let addInfoArr = [];
	if (arr[index]) {
		if (addPageHeight + arr[index].height > pageHeight) {
			isAdd = true;
			if (arr[index].type) {
				// 动态组件
				const {
					curPageleftSize,
					needPageSize,
					calcAddInfoArr,
					lastPageLeftSize,
					reAddPageHeight,
					calcPage
				} = calcMaxAddSize(addPageHeight, arr[index].pageSize, item, page);
				page = calcPage;
				console.log('page', page);
				addPageHeight = reAddPageHeight;
				addInfoArr = calcAddInfoArr;
			} else {
				page++;
				addPageHeight = arr[index].height;
			}
		} else {
			addPageHeight = addPageHeight + arr[index].height;
			isAdd = false;
		}
	}
	item.addInfoArr = addInfoArr;
	item.page = page;
	item.addPageHeight = addPageHeight;
	return item;
});
console.log('arr', arr);

// -----1
// arr.map((prev, curr, index, arr) =>{
//     var temp = []
//    if(addPageHeight + arr[index + 1].height > pageHeight){
//         page ++
//         addPageHeight = t[index].height
//    }else {
//        addPageHeight = addPageHeight +  t[index].height
//    }
// },[])

// -----2
// arr.map((item, index) =>{
//     var temp = []
//     if(arr[index + 1]){
//         if(addPageHeight + arr[index + 1].height > pageHeight){
//             page ++
//             isAdd = true
//             addPageHeight = arr[index].height
//        }else {
//            addPageHeight = addPageHeight +  arr[index].height
//            isAdd = false
//        }
//     }
//     // else {
//     //     const h = arr[arr.length - 1].height
//     //     if(addPageHeight + h > pageHeight){
//     //         page ++
//     //         isAdd = true
//     //         addPageHeight = h
//     //     }else {
//     //         addPageHeight += h
//     //         isAdd = false
//     //     }
//     // }
//     item.page = page
//     item.addPageHeight = addPageHeight
//     return item
// })

// --------3

// arr.map((item, index) =>{
//     var temp = []
//     if(arr[index]){
//         if(addPageHeight + arr[index].height > pageHeight){
//             page ++
//             isAdd = true
//             addPageHeight = arr[index].height
//             // console.log("arr[index].pageSize > maxSize", arr[index].pageSize ,"----", maxSize)
//             if(arr[index].pageSize > maxSize) {
//                 calcMaxAddSize(addPageHeight, arr[index].pageSize)
//             }
//             // else {

//             // }
//        }else {
//            addPageHeight = addPageHeight + arr[index].height
//            isAdd = false
//        }
//     }
//     // else {
//     //     const h = arr[arr.length - 1].height
//     //     if(addPageHeight + h > pageHeight){
//     //         page ++
//     //         isAdd = true
//     //         addPageHeight = h
//     //     }else {
//     //         addPageHeight += h
//     //         isAdd = false
//     //     }
//     // }
//     item.page = page
//     item.addPageHeight = addPageHeight
//     return item
// })
