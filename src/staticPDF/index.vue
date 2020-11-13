<template>
  <section class="pdf-box">
    <div
      id="homeDom"
      class="pdf-box-bg"
      :class="{ 'isIphoneX-box': isPhoneX() }"
    >
      <home-page id="homePage"></home-page>
      <preface-page id="prefacePage"></preface-page>
      <risk-warning id="riskWarningPage"></risk-warning>
      <directory-page id="directoryPage" :list="directoryList"></directory-page>
      <!-- <content-page-one
        :rateDes="rateDes"
        :pieData="pieData"
        :assetCurve="assetCurve"
        :periodAsset="periodAsset"
        :endPeriodPositionDetail="periodPopDetail"
        :periodIncome="periodIncome"
        :hisIncome="hisIncome"
        :dealRecord="dealRecord"
        :comsData="comsData"
        id="contentPageOne"
      ></content-page-one> -->
      <ContentPageOne :comsData="comsData" />
      <end-page id="endPage"></end-page>
    </div>
  </section>
</template>

<script>
import { isPhoneX } from "@/utils/com-methods";
import { htmlToPDF } from "@/utils/mixins/htmlToPdf";
import PrefacePage from "./coms/prefacePage";
import HomePage from "./coms/homePage";
import DirectoryPage from "./coms/directoryPage";
import EndPage from "./coms/endPage";
import RiskWarning from "./coms/riskWarningPage";
import ContentPageOne from "./coms/contentPageOne";
import { calcLayoutModule, calcHeight } from "./coms/calcLayout";
import {
  detailTableColumn,
  periodIncomeColumn,
  hisIncomeColumn,
  dealRecordColumn,
  periodAssetColumn,
} from "./coms/data";
// import {periodPopDetailData, periodIncomeData, hisIncomeData, dealRecordData} from './mockData'
import {
  periodPopDetail,
  periodIncome,
  hisIncome,
  dealRecord,
  pieOption,
} from "./mockData";
export default {
  head() {
    return {
      title: "PDF",
    };
  },
  data() {
    const rateDes = "注：持仓比例中美元资产已兑换人民币计算，汇率为：";
    const list = [];
    new Array(20).forEach((item) => {
      list.push([item["enddate"], item["amount"], item["en_netinput"]]);
    });
    const lineOption = {
      color: ["#187FC3", "#CF121B"],
      backgroundColor: "#FFFFFF",
      legend: {
        data: ["账户市值", "净值资额"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      dataset: {
        source: [["enddate", "amount", "en_netinput"], ...list],
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
      },
      yAxis: {},
      series: [
        {
          name: "账户市值",
          type: "line",
          encode: { x: "enddate", y: "amount" },
          tooltip: [1],
          areaStyle: {},
          smooth: true,
        },
        {
          name: "净值资额",
          type: "line",
          encode: { x: "enddate", y: "en_netinput" },
          tooltip: [1],
          areaStyle: {},
          smooth: true,
        },
      ],
    };
    return {
      comsData: [],
      loading: "",
      isPhoneX: isPhoneX, // 判断是否是iphonex等机型,
      directoryList: [
        { name: "期末资产" },
        { name: "期末持仓明细" },
        { name: "资产增长图" },
        { name: "区间盈亏明细" },
        { name: "历史退出产品回报明细" },
        { name: "期间交易记录" },
      ],
      moduleA: {
        rateDes: "注：持仓比例中美元资产已兑换人民币计算，汇率为：",
        pieData: pieOption,
        periodAsset: [
          {
            aAssetType: 6027.19,
            allAsset: 58503.350000000006,
            enNav: 47448.98,
            stockType: 5027.18,
          },
          {
            aAssetType: "10.30%",
            allAsset: "100%",
            enNav: "81.10%",
            stockType: "8.59%",
          },
        ],
        tbColumn: periodAssetColumn,
      },
      moduleB: {
        rateDes,
        tbData: periodPopDetail,
        tbColumn: detailTableColumn,
        title: "期末持仓",
        showSummary: false
      },
      moduleC: {
        assetCurve: lineOption,
      },
      moduleD: {
        rateDes,
        periodIncome,
        tbData: periodIncome,
        title: "区间盈亏明细",
        tbColumn: periodIncomeColumn,
        showSummary: true
      },
      moduleE: {
        rateDes,
        hisIncome,
        tbData: hisIncome,
        title: "历史退出产品回报明细",
        tbColumn: hisIncomeColumn,
        showSummary: true
      },
      moduleF: {
        rateDes,
        dealRecord,
        tbData: dealRecord,
        title: "期间交易记录",
        tbColumn: dealRecordColumn,
        showSummary: false
      },
    };
  },
  components: {
    ContentPageOne,
    RiskWarning,
    EndPage,
    PrefacePage,
    HomePage,
    DirectoryPage,
  },
  mixins: [htmlToPDF],

  mounted() {
    this.onCalcLayout();
    this.isLoading = true;
    setTimeout(() => {
      // this.getPdf('PDF导出', 'homeDom')
    }, 1500);
  },
  methods: {
    async onCalcLayout() {
      // console.log("this.moduleB", this.moduleB);
      // console.log("this.moduleC", this.moduleC);
      // console.log("this.moduleD", this.moduleD);
      // console.log("this.moduleE", this.moduleE);
      // console.log("this.moduleF", this.moduleF);
      const ret = await new Promise((resolve) => {
        const arr = [
          {
            height: 711,
            name: "TerminalAsset",
            tbName: "module1",
            title: "期末持仓",
            type: 0, // 动态组件1 非动态组件0
            dataObj: this.moduleA,
            ...this.moduleA
          },
          {
            height: calcHeight(this.moduleB.tbData).height,
            name: "TableContainer",
            tbName: "module2",
            title: "期末持仓明细",
            pageSize: calcHeight(this.moduleB.tbData).pageSize,
            type: 1,
            dataObj: this.moduleB,
            ...this.moduleB,
            columnAttr: detailTableColumn,
            isNewTable: true
          },
          {
            height: 745,
            tbName: "module3",
            title: "资产增长图",
            name: "AssetIncrease",
            type: 0,
            dataObj: this.moduleC,
            ...this.moduleC,
          },
          {
            height: calcHeight(this.moduleD.tbData).height,
            name: "TableContainer",
            tbName: "module4",
            title: "区间盈亏明细",
            pageSize: calcHeight(this.moduleD.tbData).pageSize,
            type: 1,
            dataObj: this.moduleD,
            ...this.moduleD,
            columnAttr: periodIncomeColumn,
            isNewTable: true
          },
          {
            height: calcHeight(this.moduleE.tbData).height,
            name: "TableContainer",
            tbName: "module5",
            title: "历史退出产品回报明细",
            pageSize: calcHeight(this.moduleE.tbData).pageSize,
            type: 1,
            dataObj: this.moduleE,
            ...this.moduleE,
            columnAttr: hisIncomeColumn,
            isNewTable: true
          },
          {
            height: calcHeight(this.moduleF.tbData).height,
            name: "TableContainer",
            tbName: "module6",
            title: "期间交易记录",
            pageSize: calcHeight(this.moduleF.tbData).pageSize,
            type: 1,
            dataObj: this.moduleF,
            ...this.moduleF,
            columnAttr: dealRecordColumn,
            isNewTable: true
          },
        ];
        const calcRet = calcLayoutModule(arr);
        // console.log("calcRet", calcRet);
        resolve(calcRet);
      });
      console.log("ret---", ret);
      this.comsData = ret;
    },
    timeFormatYMD(value) {
      //20201102
      if (!value) {
        return "--";
      }
      const year = value.slice(0, 4);
      const month = value.slice(4, 6);
      const day = value.slice(6, value.length + 1);
      return `${year}.${month}.${day}`;
    },
  },
};
</script>

<style lang="less">
.van-overlay {
  background-color: #000000;
}
</style>
