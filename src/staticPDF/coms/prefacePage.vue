<template>
  <layout :headerType="'paddingLong'">
    <div class="preface-pdf">
      <div class="preface-pdf-title">
        <img src="../../assets/images/pdf-title-icon.png" alt=""/>
        前言
      </div>
      <div class="preface-pdf-label">
        尊敬的嘉实财富客户：
      </div>
      <div class="preface-pdf-content">
        <div class="margin-bottom">
          &emsp;&emsp;此份个人账户报告是针对您在嘉实财富的在投资产进行分析统计生成。本报告旨在协助您全面了解自己的财务状况，明确财务需求及目标，供您在管理资产的决策中有所参考，但并不能代替其他专业分析报告。
        </div>
        <div>
          &emsp;&emsp;本建议书的资料来源包括以下几个方面：
        </div>
        <div>
          &emsp;&emsp; 1、您在我司的近期和过往的全部资产
        </div>
        <div>
          &emsp;&emsp; 2、我司产品过往历史数据
        </div>
        <div>
          &emsp;&emsp; 3、您提供给我司并授权可查看的有关您的财务状况及家庭情况的相关资料及文件
        </div>
        <div>
          &emsp;&emsp; 4、我们通关相关机构搜集到的各种政策及法规
        </div>
        <div class="margin-bottom">
          &emsp;&emsp; 5、我们在过往理财业务中积累的相关资料
        </div>
        <div class="margin-bottom underline bold">
          本报告仅供您参考，并不具备最终的法律效力。请自诩阅读本报告中包含的“风险提示”
        </div>
        <div>
          &emsp;&emsp;嘉实财富管理有限公司是嘉实旗下的独立财富管理机构，于2012年3月注册成立，总部位于北京，在北京、上海、广州、杭州、深圳、青岛、南京、成都、宁波、西安、苏州等全国主要城市均设有财富管理服务中心。
        </div>
        <div>
          &emsp;&emsp;秉承嘉实“远见者稳进“的理念，依托强大的实力与背景，嘉实财富以全球化视野，为客户提供全方位的资产配置服务。
        </div>
        <div>
          &emsp;&emsp;凭借领先金融市场的投研能力，嘉实财富洞悉判研趋势，积极在全球范围内优选产品，根据科学前沿的资产配置模型，以理财顾问的方式，在财富规划、资产配置和财富传承等领域提供全面而个性化的专业服务，帮助客户实现全球化的资产配置和财富的保值增值。
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import layout from "./layout";
export default {
  name: "prefacePage",
  components: {
    layout
  }
}
</script>

<style lang="less">
.preface-pdf {
  padding: 0 186px;
  color: #333333;
  .preface-pdf-title {
    height: 60px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 60px;
    margin-bottom: 100px;
    img {
      width: 45px;
      height: 45px;
      display: inline-block;
      margin-right: 35px;
    }
  }
  .preface-pdf-label {
    font-weight: 500;
    font-size: 50px;
    margin-bottom: 50px;
  }
  .preface-pdf-content {
    font-size: 38px;
    line-height: 80px;
  }
  .margin-bottom {
    margin-bottom: 60px;
  }
  .underline {
    text-decoration: underline
  }
  .bold {
    font-weight: bold;
  }
}
</style>
