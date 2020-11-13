<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
