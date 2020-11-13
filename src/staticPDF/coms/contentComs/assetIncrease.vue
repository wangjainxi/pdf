<template>
  <div class="table-container asset-increase">
    <div class="data-title">
      <img src="../../../assets/images/pdf-title-icon.png" alt="" />
      {{ "资产增长图" }}
    </div>
    <div class="asset-increase-chart" id="line"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "assetIncrease",
  props: {
    dataObj: {
      type: Object,
      default: () => {
        return {
          assetCurve: {},
        };
      },
    },
  },
  data() {
    return {
      line: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.line = echarts.init(document.getElementById("line"));
      this.line.setOption(this.dataObj.assetCurve);
    }, 100);
  },
};
</script>

<style scoped>
</style>
