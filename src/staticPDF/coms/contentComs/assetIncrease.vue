<template>
  <div class="table-container asset-increase">
    <div class="data-title">
      <img src="../../../assets/images/pdf-title-icon.png" alt=""/>
      {{'资产增长图'}}
    </div>
    <div class="asset-increase-chart" id="line"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "assetIncrease",
  props: {
    assetCurve: Object
  },
  data () {
    return {
      line: null
    }
  },
  mounted() {
    setTimeout(()=> {
      this.line = echarts.init(document.getElementById('line'))
      this.line.setOption(this.assetCurve)
    }, 100)
  }
}
</script>

<style scoped>

</style>
