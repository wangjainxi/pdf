export const myInfo = {
  methods: {
    // 获取个人信息
    async getMyInfo (errorBack) {
      let params = {
        param: {}
      }
      let res = await this.$store.dispatch('WBS_API_MYINFO', params)
      if (res.success) {
        return res.data
      } else {
        if (res.errorCode === 1001 || res.errorCode === 1002) {
          this.$delCookie('token')
          if (errorBack) {
            errorBack()
          }
        } else {
          this.$toast(res.msg)
        }
      }
    },
  }
}
