<template>
  <div class="directory-pdf">
    <img class="directory-pdf-img" src="../../assets/images/directoryPDFBg.png"/>
    <div class="directory-page-pdf-content">
      <div class="directory-item" v-for="(item, index) in list" :key="index">
        <img src="../../assets/images/directory-icon.png" alt=""/>
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "directoryPage",
  props: {
    list: Array
  }
}
</script>

<style lang="less">
.directory-pdf {
  width: 2480px;
  height: 3525px;
  position: relative;
  top: 0;
  left: 0;
  .directory-pdf-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .directory-page-pdf-content {
    position: absolute;
    top: 1800px;
    left: 313px;
    z-index: 200;
    width: 1800px;
    max-height: 1500px;
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
    .directory-item {
      img {
        width: 62px;
        height: 62px;
        margin-right: 50px;
      }
      margin: 30px 0;
      font-size: 80px;
      font-weight: bold;
      line-height: 115px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>
