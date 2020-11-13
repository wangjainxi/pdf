<template>
  <div class="table-container">
    <div class="data-title">
      <img src="../../../assets/images/pdf-title-icon.png" alt=""/>
      {{title}}
    </div>
    <div class="data-des">
      {{rateDes}}
    </div>
    <pdf-table :table-data="tableData" :table-columns="tableColumn" :showSummary="showSummary"></pdf-table>
  </div>
</template>

<script>
import PdfTable from "./../pdf-table";
export default {
  name: "tableContainer",
  components: {
    PdfTable
  },
  props: {
    title: String,
    showSummary: {
      type: Boolean,
      default: false
    },
    rateDes: String,
    tableData: Array,
    tableColumn: Array
  },
  data(){
    return {
      // tableData: []
    }
  },
  // watch: {
  //   clientDetails(newVal){
  //       this.expandDetail = newVal;
  //       console.log(this.expandDetail);
  //   }
  // },
}
</script>

<style scoped>

</style>
