<template>
  <div class="pdf-layout-container">
    <div class="pdf-header" :style="headerType === 'paddingLong' ? {} : {height: '260px', padding: '140px 0 0 0'}">
      <img v-if="headerType === 'paddingLong'" src="../../assets/images/pdf-preface-header.png"/>
      <img v-else src="../../assets/images/pdf-content-header.png"/>
    </div>
    <div class="pdf-content" :style="headerType === 'paddingLong' ? {} : {height: 'calc(100% - 500px)'}">
      <slot></slot>
    </div>
    <div class="pdf-footer">
      <div class="bottom-line"></div>
      <div class="bottom-word">
        好 金 融 • 常 陪 伴
      </div>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout",
  props: {
    headerType: {
      type: String,
      default: 'paddingShort'
    }
  }
}
</script>

<style lang="less">
.pdf-layout-container {
  display: flex;
  flex-direction: column;
  width: 2480px;
  height: 3525px;
  .pdf-header {
    height: 400px;
    width: 100%;
    padding: 140px 0;
    img {
      width: calc(100% - 187px);
      height: 120px;
    }
  }
  .pdf-footer {
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    .bottom-line {
      width: 1026px;
      height: 4px;
      background-color: #000000;
      opacity: 0.2;
    }
    .bottom-word {
      width: calc(100% - 2052px);
      text-align: center;
      font-size: 30px;
      color: #333333;
    }
  }
  .pdf-content {
    height: calc(100% - 700px);
    width: 100%;
  }
}
</style>
