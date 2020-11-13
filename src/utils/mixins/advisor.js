const methods = {
  getAdvisorInfo () { // 理财师信息
    let params = { // 理财师信息接口参数
      param: {
        value: this.$route.query.faId
      }
    }
    this.$store.dispatch('WBS_API_ADVISOR', params).then((res) => {
      if (res.success) {
        this.aboutAccountants = res.data || {}
      } else {
        this.$toast(res.msg)
      }
    })
  }
}
export default {
  methods
}
