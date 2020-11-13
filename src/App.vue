<template>
  <div id="app">
    <staticPDF/>
  </div>
</template>

<script>
import staticPDF from './staticPDF/index'

export default {
  name: 'App',
  components: {
    staticPDF
  },
  data(){
    return{
    msg:"Welcome to Your Vue.js App"
    }
  }
}
</script>

<style>
.content-page-container .table-container .table-limit .el-table__body-wrapper table td,
.el-table td, .el-table th {
  padding: 0;
}
.content-page-container .table-container .table-limit .el-table__body-wrapper table tr{
  border-spacing:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  padding: 0;
  margin: 0
}
</style>
