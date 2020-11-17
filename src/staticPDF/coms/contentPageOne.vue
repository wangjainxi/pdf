<template>
  <div>
    <!-- <div v-for="(layoutItem, index) in comsData" :key="'layout'+index">
        <layout :headerType="'paddingShort'">
          <div v-for="(moduleItem, idx) in layoutItem" :key="idx.name" >
            <div class="content-page-container">
              <component :is="moduleItem.name" v-bind="$attrs" v-if="moduleItem.dataObj" :dataObj="moduleItem.dataObj"/>
            </div>
          </div>
        </layout>
    </div> -->
     <layout :headerType="'paddingShort'">
    <div class="content-page-container" v-for="(moduleItem, idx) in layoutItem" :key="idx.name">
      <component :is="moduleItem.name" v-bind="$attrs" v-if="moduleItem.dataObj" :dataObj="moduleItem.dataObj"/>
    </div>
  </layout>
  </div>
</template>

<script>
import layout from "./layout";
import PdfTable from "./pdf-table";
import TerminalAsset from "./contentComs/terminalAsset";
import TableContainer from "./contentComs/tableContainer";
import addTableContainer from "./contentComs/addTableContainer";
import AssetIncrease from "./contentComs/assetIncrease";
export default {
  name: "contentPage",
  components: {
    AssetIncrease,
    TableContainer,
    TerminalAsset,
    PdfTable,
    layout,
    addTableContainer
  },
  props: {
    layoutItem: Array,
    comsData: Array,
    rateDes: String,// 表格的汇率描述
    periodAsset: Array,// 期末资产
    pieData: Object,// 饼图数据
    assetCurve: Object, // 线图数据
    dealRecord: Array, // 期间交易记录
    endPeriodPositionDetail: Array, // 期末持仓明细
      periodIncome: Array, // 区间盈亏明细
    hisIncome: Array, // 历史退出产品回报明细
  },
  data() {
    console.log("endPeriodPositionDetail", this.endPeriodPositionDetail);
    return {
      TerminalAsset: TerminalAsset,
      TableContainer: TableContainer,
      AssetIncrease:AssetIncrease,
      unCaclComsData: [
        {
          name: "TerminalAsset",
          // data: {
          //   rateDes: this.rateDes,
          //   periodAsset: this.periodAsset,
          //   pieData: this.pieData
          // }
        },
      ],
      detailTableColumn: [
        {
          value: "产品名称",
          name: "vc_fundname",
        },
        {
          value: "份额",
          name: "en_totalshare",
        },
        {
          value: "净值",
          name: "en_nav",
        },
        {
          value: "净值日期",
          name: "vc_navdate",
        },
        {
          value: "市值",
          name: "en_totalamt",
        },
        {
          value: "比例",
          name: "ratio",
        },
        {
          value: "资产类型",
          name: "a_assetype",
        },
        {
          value: "投资期限",
          name: "c_duration",
        },
        {
          value: "业绩基准",
          name: "c_benckmark",
        },
      ],
      periodIncomeColumn: [
        { name: "vc_fundcode", value: "产品名称" },
        { name: "en_startamt", value: "期初市值" },
        { name: "en_input", value: "转入金额" },
        { name: "output", value: "流出金额" },
        { name: "en_endamt", value: "期末市值" },
        { name: "en_income", value: "区间投资收益" },
        { name: "en_incomerate", value: "区间收益率" },
        { name: "en_xirrrate", value: "年化回报率" },
      ],
      hisIncomeColumn: [
        { name: "vc_fundcode", value: "产品名称" },
        { name: "startDate", value: "起始日期" },
        { name: "endDate", value: "退出日期" },
        { name: "en_input", value: "投资金额" },
        { name: "output", value: "分配金额" },
        { name: "en_income", value: "投资收益" },
        { name: "en_incomerate", value: "绝对回报率" },
        { name: "en_xirrrate", value: "年化回报率" },
      ],
      dealRecordColumn: [
        { name: "fundName", value: "产品名称" },
        { name: "businFlag", value: "交易类型" },
        { name: "acceptDate", value: "交易日期" },
        { name: "confirmShare", value: "份额" },
        { name: "confirmDateNav", value: "净值" },
        { name: "confirmDate", value: "净值日期" },
        { name: "confirmAmount", value: "金额" },
      ],
    };
  },
};
</script>

<style lang="less">
.content-page-container {
  padding: 0 135px;

  .table-container {
    width: 100%;
    margin-top: 200px;

    .table-limit {
      width: 100%;
      margin-top: 50px;
      .el-table__footer-wrapper {
        td {
          height: 100px;
          background: #f1f8fc;
          text-align: center;
          color: #333333;
          font-weight: bolder;
          font-size: 32px;
        }
      }
      .el-table__empty-block {
        text-align: center;
        height: 110px !important;
        font-size: 26px;
        line-height: 110px;
        color: #666666;
        border-bottom: 2px solid #999999;
      }
      .el-table__body-wrapper {
        table {
          table-layout: fixed;
          word-break: break-all;
          td {
            .cell {
              height: 110px;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            font-size: 26px;
            color: #666666;
          }
          .el-table__row:last-child {
            td {
              border-bottom: 2px solid #999999;
            }
          }
        }
      }
      .el-table__header-wrapper {
        table {
          th {
            background: #f1f8fc;
            font-weight: bold;
            font-size: 32px;
            color: #333333;
            text-align: center;
            height: 100px;
            border-bottom: 2px solid #187fc3;
          }
        }
      }
    }
    .data-title {
      height: 86px;
      font-size: 60px;
      font-weight: bold;
      color: #333333;
      img {
        width: 45px;
        height: 45px;
        margin-right: 31px;
      }
    }
    .data-des {
      height: 45px;
      font-size: 30px;
      color: #969696;
      margin-top: 20px;
    }
  }
  .asset-increase {
    height: 545px;

    .asset-increase-chart {
      height: 350px;
      margin-top: 109px;
    }
  }
  .terminal-asset {
    display: flex;
    height: 521px;
    .terminal-asset-table {
      margin-right: 170px;
      width: 1285px;
    }
    .terminal-asset-pie {
      width: 710px;
      height: 450px;
      margin-top: 70px;
    }
  }
}
</style>
