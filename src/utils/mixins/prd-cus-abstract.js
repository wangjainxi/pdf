import { handleAbstractDetail } from './handleAbstract'
export const abstractFun = {
  mixins: [ handleAbstractDetail ],
  methods: {
    // 摘要信息
    async getAbstractDetail (productNo, templateId, summaryLayoutFields) {
      let params = {
        data: {
          productNo: productNo || this.$route.query.value,
          templateId: templateId || this.$route.query.templateId, // 目前只有一个模板所以模板写死
          summaryLayoutFields: summaryLayoutFields || this.dataAbstractUI
        },
        name: 'npdc.product.h5.abstract'
      }
      let res = await this.$store.dispatch('NEW_WBS_NPDC_WEB', params)
      if (res.code === 0) {
        return this.handleAbstractDetail(res.value, this.dataAbstractUI)
      } else {
        this.$toast(res.msg)
      }
    }
  }
}
