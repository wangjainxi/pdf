<template>
  <layout :headerType="'paddingLong'">
    <div class="preface-pdf">
      <div class="preface-pdf-title">
        <img src="../../assets/images/pdf-title-icon.png" alt=""/>
        风险提示
      </div>
      <div class="risk-warning-content">
        <div class="margin-bottom">
          <div class="chinese-name">
            1.本账户信息不得转让、不得作为担保、融资或变相融资的依据；
          </div>
          <div class="english-name">
            The account information shall not be transferred, or used for guarantee and financing of any kind.
          </div>
        </div>
        <div class="margin-bottom">
          <div class="chinese-name">
            2.本账户信息仅限于证明该客户通过嘉实财富管理有限公司的购买金融资产情况，不得做其他任何用途；对本账户信息的误用或其内容的误解，嘉实财富管理有限公司不承担任何法律责任；
          </div>
          <div class="english-name">
            The account information shall only prove the holder's investment on financial assets via Harvest Wealth Management Co., Ltd. The company shall not be liable for any misuse or misunderstanding of the information.
          </div>
        </div>
        <div class="margin-bottom">
          <div class="chinese-name">
            3.本账户信息仅限于证明申请人在本账户信息记载截至日其在嘉实财富管理有限公司记载的最近时点（段）的其购买资产存在情况；
          </div>
          <div class="english-name">
            The account information shall only prove the holder's latest purchasing of financial assets via Harvest Wealth Management Co., Ltd. on the date or period provided above.
          </div>
        </div>
        <div class="margin-bottom">
          <div class="chinese-name">
            4.本账户信息中数据是依据本账户信息生成时嘉实财富系统中记载产品方的单位净值数据计算，该数据直接或间接来自产品方，嘉实财富管理有限公司对此数据的准确性不承担任何责任；
          </div>
          <div class="english-name">
            The data on the account information is calculated based on the unit net value of the product in the system of Harvest Wealth Management Co., Ltd. on the date provided above. The data is provided directly or indirectly by the product provider, and Harvest Wealth Management Co., Ltd. shall not be responsible for the accuracy of the data.
          </div>
        </div>
        <div class="margin-bottom">
          <div class="chinese-name">
            5.对本账户信息的任何内容的修改或涂改的，均为无效证明；
          </div>
          <div class="english-name">
            The account information shall be invalid if there is any revision or alteration.
          </div>
        </div>
        <div>
          <div class="chinese-name">
            6.若涉及外币，则外币资产为按照本账户信息记载汇率中间价折算为人民币资产。
          </div>
          <div class="english-name">
            The value of assets in foreign currencies (if any) have been converted to RMB based on the central parity of RMB against the foreign currency announced by the People's Bank of China on the date provided above.
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import layout from "./layout";
export default {
  name: "riskWarning",
  components: {
    layout
  }
}
</script>

<style lang="less">
.preface-pdf {
  .risk-warning-content {
    line-height: 80px;
    font-size: 38px;
  }
  .chinese-name {
    color: #333333;
  }
  .english-name {
    color: #9b9b9b;
  }
}
</style>
