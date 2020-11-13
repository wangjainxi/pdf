<template>
  <div class="home-page-pdf">
    <img src="../../assets/images/homePagePDFImg.png"/>
    <div class="home-page-pdf-content">
      <div class="chinese-title">个人账户投资报告</div>
      <div class="english-title">Personal account Investment Report</div>
      <div class="home-page-pdf-des cus-name">客户姓名：{{'客观'}}</div>
      <div class="home-page-pdf-des search-date">查询日期：{{'2020.01.01-2020.02.04'}}</div>
      <div class="home-page-pdf-des product-date">报告生成日期：{{'2020.02.03'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage"
}
</script>

<style lang="less">
.home-page-pdf {
  width: 2480px;
  height: 3525px;
  position: relative;
  top: 0;
  left: 0;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .home-page-pdf-content {
    position: absolute;
    bottom: 470px;
    left: 200px;
    z-index: 200;
    height: 890px;
    width: 1800px;
    .chinese-title {
      color: #FFFFFF;
      font-family: SourceHanSerifSC;
      height: 287px;
      font-weight: bold;
      font-size: 200px;
      line-height: 287px;
    }
    .english-title {
      font-size: 80px;
      color: #44A0DE;
      height: 120px;
      line-height: 120px;
      font-family: SourceHanSerifSC;
      margin: 32px 0 81px 0;
    }
    .home-page-pdf-des {
      color: #AFDEFD;
      font-size: 60px;
      height: 90px;
      line-height: 90px;
      margin-top: 30px;
    }
    .home-page-pdf-des {}
  }
}
</style>
