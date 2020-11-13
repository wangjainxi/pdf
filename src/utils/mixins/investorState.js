export const investorState = {
  methods: {
    async getInvestorState (data) { // 获取投资人状态
      let riskEvaluation = this.datas.riskEvaluation
      let riskValue = Number(this.datas.riskValue) // 产品风险等级
      let myRiskValue = Number(data.riskValue) // 我的风险等级
      /*
      * 是否做过测评
      * 1：做过
      * */
      let doneRiskSurvey = data.doneRiskSurvey

      if (riskEvaluation != 1) {
        // 未开启风险测评(不需要评测)
        console.log('riskEvaluation:' + riskEvaluation)
        return false
      }
      // 该产品没有风险等级(不需要评测)
      if (!riskValue) {
        return false
      }

      if (doneRiskSurvey !== 1) { // 未做过测评
        this.dialogTitle = `为了更好地为您提供符合您要求的资产配置服务，请您在开始投资前，填写《风险承受能力评测》问卷。`
        this.sureName = '去填写问卷'
        this.$refs.promptRiskTest.show()
        return true
      }

      // 该产品的风险等级等于当前用户的风险等级
      if ((myRiskValue & riskValue) == myRiskValue) {
        let params = {
          param: {}
        }
        let res = await this.$store.dispatch('WBS_API_CHECKSUERVEYENABLE', params)
        if (res.success) {
          if (!res.data) { // 启用新问卷
            this.dialogTitle = `已为您更新风险承受能力测试题，是否前往重新测评？若不重新测评仍可保留现有测评结果。`
            this.sureName = '重新去测评'
            this.$refs.promptRiskTest.show()
            return true
          } else {
            // 未启用新问卷(不需要评测)
            return false
          }
        } else {
          this.$toast(res.msg)
        }
        return false
      }

      // 做过评测 但是该产品的风险等级不等于当前用户的风险等级
      if (Number(riskValue) !== Number(myRiskValue)) {
        this.dialogTitle = `该服务的风险等级高于您的风险承受能力，不能查看该服务详情。`
        this.sureName = '重新去测评'
        this.$refs.promptRiskTest.show()
        return true
      }
    }
  }
}
