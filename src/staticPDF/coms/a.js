const arr = [
        {
          height: 711,
          name: "TerminalAsset",
          tbName: "module1",
          title: "期末持仓",
          type: 0, // 动态组件1 非动态组件0
          dataObj: {},
        },
        {
          height: calcHeight(),
          name: "TableContainer",
          tbName: "module2",
          title: "期末持仓明细",
          pageSize: calcHeight(),
          type: 1,
          dataObj: {},
        },
        {
          height: 745,
          name: "TableContainer",
          tbName: "module3",
          title: "资产增长图",
          name: "AssetIncrease",
          type: 0,
          dataObj: {},
        },
        {
          height: calcHeight(),
          name: "TableContainer",
          tbName: "module4",
          title: "区间盈亏明细",
          pageSize: calcHeight(),
          type: 1,
          dataObj: {},
        },
        {
          height: calcHeight(),
          name: "TableContainer",
          tbName: "module5",
          title: "历史退出产品回报明细",
          pageSize: calcHeight(),
          type: 1,
          data: {},
        },
        {
          height: calcHeight(),
          name: "TableContainer",
          tbName: "module6",
          title: "期间交易记录",
          pageSize: calcHeight(),
          type: 1,
          data: {},
        },
      ];
