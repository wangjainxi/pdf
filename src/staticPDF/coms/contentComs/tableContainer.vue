<template>
  <div class="table-container">
    <div class="data-title">
      <img src="../../../assets/images/pdf-title-icon.png" alt="" />
      {{ dataObj.title }}
    </div>
    <div class="data-des">
      {{ dataObj.rateDes }}
    </div>
    <pdf-table
      :table-data="dataObj.tbData"
      :table-columns="dataObj.tbColumn"
      :showSummary="dataObj.showSummary"
    ></pdf-table>
  </div>
</template>

<script>
import PdfTable from "./../pdf-table";
export default {
  name: "tableContainer",
  components: {
    PdfTable,
  },
  props: {
    dataObj: {
      type: Object,
      default: () => {
        return {
          showSummary: false,
          tableData: [],
          tableColumn: [],
        };
      },
    },
    title: String,
    showSummary: {
      type: Boolean,
      default: false,
    },
    rateDes: String,
    tableData: Array,
    tableColumn: Array,
  },
  data() {
    return {
      // tableData: []
    };
  },
  // watch: {
  //   clientDetails(newVal){
  //       this.expandDetail = newVal;
  //       console.log(this.expandDetail);
  //   }
  // },
};
</script>

<style scoped>
</style>
