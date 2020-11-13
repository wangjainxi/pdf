import { myInfo } from './myInfo.js'
export const judgeHideField = {
  data () {
    return {
      myInfo: {}
    }
  },
  mixins: [ myInfo ],
  methods: {
    async judgeHideField (datas) {
      const token = this.$getCookie('token')
      // 产品是否开启合格投资者认证
      if (!datas.authenticate) { // 未开启
        return false
      }
      // 已登录
      if (token) {
        if (!this.myInfo) {
          this.myInfo = await this.getMyInfo()
        }
        if (this.myInfo.qualified) {
          return false
        } else {
          return true
        }
      }
      // 未登录
      return true
    }
  }
}
