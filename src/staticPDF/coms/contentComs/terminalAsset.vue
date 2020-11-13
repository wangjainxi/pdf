<template>
  <div class="table-container terminal-asset">
    <div class="terminal-asset-table">
      <div class="data-title">
        <img src="../../../assets/images/pdf-title-icon.png" alt="" />
        {{ "期末资产" }}
      </div>
      <div class="data-des">
        {{ dataObj.rateDes }}
      </div>
      <pdf-table
        :table-data="dataObj.periodAsset"
        :table-columns="dataObj.tbColumn"
      ></pdf-table>
    </div>
    <div class="terminal-asset-pie" id="pie"></div>
  </div>
</template>

<script>
import PdfTable from "./../pdf-table";
import echarts from "echarts";
export default {
  name: "terminalAsset",
  components: {
    PdfTable,
  },
  props: {
    dataObj: {
      type: Object,
      default: () => {
        return {
          periodAsset: [],
          pieData: {},
          rateDes: "",
        };
      },
    },
    // periodAsset: Array,
    // pieData: Object,
    // rateDes: String
  },
  data() {
    return {
      pie: null,
      periodAssetColumn: [
        { name: "allAsset", value: "总资产" },
        { name: "enNav", value: "净值型" },
        { name: "aAssetType", value: "类固收" },
        { name: "stockType", value: "股权类" },
      ],
    };
  },
  watch:{
    "dataObj.pieOption":{
      handler(v1,v2){
        console.log('dataObj.pieData" v1, v2', v1,v2)
      },
      immediate: true
    }
  },
  mounted() {
    console.log('mmm1111', this.dataObj)
    setTimeout(() => {
      this.pie = echarts.init(document.getElementById("pie"));
      this.pie.setOption(this.dataObj.pieData);
    }, 100);
  },
};
</script>

<style scoped>
</style>
