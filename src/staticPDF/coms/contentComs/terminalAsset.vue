<template>
  <div class="table-container terminal-asset">
    <div class="terminal-asset-table">
      <div class="data-title">
        <img src="../../../assets/images/pdf-title-icon.png" alt=""/>
        {{'期末资产'}}
      </div>
      <div class="data-des">
        {{rateDes}}
      </div>
      <pdf-table :table-data="periodAsset" :table-columns="periodAssetColumn"></pdf-table>
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
    PdfTable
  },
  props: {
    periodAsset: Array,
    pieData: Object,
    rateDes: String
  },
  data () {
    return {
      pie: null,
      periodAssetColumn: [
        {name: 'allAsset', value: '总资产'},
        {name: 'enNav', value: '净值型'},
        {name: 'aAssetType', value: '类固收'},
        {name: 'stockType', value: '股权类'}
      ]
    }
  },
  mounted() {
    setTimeout(()=> {
      this.pie = echarts.init(document.getElementById('pie'))
      this.pie.setOption(this.pieData)
    }, 100)
  }
}
</script>

<style scoped>

</style>
