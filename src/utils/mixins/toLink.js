import { GetQueryString, delUrlParam } from '@/utils/com-methods'
export const toLink = {
  methods: {
    async redirect ({url, needUnionid = true, replace = false}){
      var faOutId = GetQueryString('faId', url)
      if (Number(faOutId) === -1) {
        url = delUrlParam('faId', url)
      }
      var entId = GetQueryString('entId', url)
      if (!entId) {
        url = `${url}&entId=${this.$route.query.entId}`
      }
      /*
      * 判断是否是预览页面
      * 预览页面不允许跳转
      * */
      let preView = this.$store.state.wbsApi.preView
      if (preView) {
        this.$toast('预览页面功能按钮仅供展示，不可操作')
        return false
      }
      /*
      * 添加parentId
      * */
      var parentId = GetQueryString('parentId', url)
      if (!parentId) {
        url = `${url}&parentId=${this.$route.query.parentId}`
      }
      /*
      * 判断是否是从展业跳转过来的
      * */
      const fromMark = GetQueryString('fromMark')
      const urlFromMark = GetQueryString('fromMark', url)
      if (fromMark && !urlFromMark) {
        url = `${url}&fromMark=true`
      }
      /*
      * 判断是否在架
      * false 不在架
      * 其它情况在架
      * */
      let prdType = this.$store.state.wbsApi.prdType
      if (prdType) {
        let boolean = await this.judgeToDetailType(prdType)
        console.log('boolean:' + boolean)
        if (boolean === false) {
          this.$toast('内容已失效')
          return false
        }
      }
      // 本地测试
      if (process.env.NODE_ENV === 'development') {
        if (replace) {
          window.location.replace(url)
        } else {
          window.location.href = url
        }
        return false
      }
      // 线上开发
      if (this.$getCookie('unionid') || !needUnionid) {
        // 已授权，unionid未失效或者不需要授权
        if (replace) {
          window.location.replace(url)
        } else {
          window.location.href = url
        }
      } else {
        // 未授权或者unionid失效
        window.location.href = `${window.location.protocol}//${window.location.host}/marketing-api/a../../redirect/wechat?serviceChannel=WBS&url=${encodeURIComponent(url)}`
      }
    },
    judgeToDetailType (type) {
      // 1：投资 2：事务 3：保险 4：活动 5：资讯
      switch (type) {
        case 1:
          return this.judgePrdState()
        case 2:
          return this.judgeLmState()
        case 3:
          return this.judgeInsState()
        case 4:
          return this.judgeAskState()
        case 5:
          return this.judgeNewsState()
      }
    },
    async judgePrdState () {
      let params = {
        param: {
          value: this.$store.state.wbsApi.prdValue
        }
      }
      let res = await this.$store.dispatch('WBS_API_PRODUCT_SHARE_DETAIL', params) // 获取详情
      console.log(111)
      if (res.data && res.data.releaseStatus !== 3) {
        return false
      } else {
        return true
      }
    },
    async judgeLmState () {
      let params = {
        data: {
          id: this.$store.state.wbsApi.prdValue,
          entId: this.$route.query.entId
        },
        name: 'lm-web.entProduct.selectById'
      }
      let res = await this.$store.dispatch('NEW_WBS_API_LM', params)
      if (res.code !== 0 || res.value.publishStatus != 3) {
        return false
      } else {
        return true
      }
    },
    async judgeInsState () {
      let params = {
        productId: this.$store.state.wbsApi.prdValue,
        entId: this.$route.query.entId
      }
      let detailRes = await this.$store.dispatch('INS_API_PRODUCT_DETAIL', params)
      if (detailRes.data) {
        console.log(1)
        if (!(detailRes.data.stopState == false && detailRes.data.productReleaseState == 'ON_SALE')) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    async judgeAskState () {
      let params = {
        data: {
          no: this.$store.state.wbsApi.prdValue
        },
        name: 'ac.activity.cus.view'
      }
      let res = await this.$store.dispatch('NEW_WBS_API_AC', params)
      if (res.code !== 0 || res.value.releaseStatus != 1) {
        return false
      } else {
        return true
      }
    },
    async judgeNewsState () {
      let params = {
        param: {
          value: this.$store.state.wbsApi.prdValue
        }
      }
      let res = await this.$store.dispatch('WBS_API_NEWS_SHARE_DETAIL', params)
      if (res.success) {
        if (!res.data || res.data.status !== 1) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  }
}
