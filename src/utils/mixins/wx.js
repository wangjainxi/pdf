import { setCookie, getCookie } from '@/utils/cookie'
import { delUrlParam, timeFormat } from '@/utils/com-methods'
export const wx = {
  methods: {
    isWeiXin (){
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      }else{
        return false
      }
    },
    setWxAndMarket ({isShare = false, type, aboutAccountants, faId, title = decodeURI(this.$route.query.title), shareId = this.$route.query.value, userId, callback} = {}) {
      console.log('title:' + title)
      console.log('this.realm:' + this.realm)
      /*
      * url带code且本地没有unionid为初次授权
      * url带code且本地有unionid为再次授权，比如刷新
      * 没有code 则不需要授权，比如非微信环境
      * */
      console.log('userId:' + userId)
      this.$store.commit('MARKETING_USERID', userId)
      let unionid = getCookie('unionid')
      // 后端授权
      if (this.$route.query.code && !unionid) {
        this.getUserRights({
          isShare,
          type,
          aboutAccountants,
          faId,
          title,
          shareId,
          userId,
          callback
        })
        return false
      } else if (unionid) {
        this.getUserRightsAction({
          isShare,
          type,
          aboutAccountants,
          faId,
          title,
          shareId,
          userId,
          callback
        })
        return false
      }
      // 前端授权
      if (!unionid && this.isWeiXin()) {
        this.getAuthorize()
        return false
      }
    },
    getUserRights ({isShare, type, aboutAccountants, faId, title, shareId, userId, callback}) { // 上传营销线索
      let params = {
        code: this.$route.query.code,
        parentId: this.$route.query.parentId,
        respondent: {
          'entityId': shareId,
          'realm': this.realm
        },
        title: title !== 'undefined' ? title : '',
        type: "VIEW",
        userId: userId || this.$route.query.entId
      }
      // 新产品上报营销线索 添加参数
      if (window.location.pathname.indexOf('productCus') !== -1) {
        params.field = {
          name: 'realmVersion',
          value: 'PRODUCT_V1'
        }
      }
      // 财富干货上报营销线索 添加参数
      if (window.location.pathname.indexOf('wealthNews') !== -1) {
        params.field = {
          name: 'realmVersion',
          value: 'ARTICLE_GENE_WEALTH'
        }
      }

      if (this.$route.query.activityId) {
        params.activityId = this.$route.query.activityId
        params.shareType = this.$route.query.shareType
        params.shareTime = timeFormat(Number(this.$route.query.shareTime), 'T')
      }
      if (this.$route.query.isH5) {
        params.shareType = this.$route.query.shareType
        params.shareTime = timeFormat(Number(this.$route.query.shareTime), 'T')
      }
      if (this.$route.query.fromMark) {
        params.association = {
          realm: 'CONTENT'
        }
      }
      this.$store.dispatch('MARKETING_API_WECHAT', params).then(async (res) => {
        if (res.success && res.param) {
          setCookie('unionid', res.param.unionid, 5)
          window.localStorage.setItem(this.$route.query.entId + 'wechatId', res.param.wechatInfo.id)
          this.$store.commit('MARKETING_WECHATID', res.param.wechatInfo.id)
          this.$store.commit('MARKETING_ACTIVITYID', res.param.activityId)

          await this.getShareId()
          this.judgeHasIM()
          this.getWxUserInfo(res.param.wechatInfo.id)
          let time = 0
          if (isShare) {
            this.setShare({type, aboutAccountants, faId})
          } else {
            this.$wxHideOnly()
          }
          try {
            this.getDetail({type, aboutAccountants, faId})
          } catch {

          }
          // 直播访问记录
          try {
            this.sendLiveViewCord(res.param.wechatInfo.id)
          } catch {

          }
          /* 回调函数 */
          if (callback) {
            callback()
          }
          setInterval(() => {
            time = 5 + time
            this.getResidenceTime(res.param.activityId, time)
          }, 5000)
        } else if(!res.success) {
          this.$toast('授权失败！')
        }
      })
    },
    getUserRightsAction ({isShare, type, aboutAccountants, faId, title, shareId, userId, callback}) {
      let params = {
        unionId: getCookie('unionid'),
        parentId: this.$route.query.parentId,
        respondent: {
          'entityId': shareId,
          'realm': this.realm
        },
        title: title !== 'undefined' ? title : '',
        type: "VIEW",
        userId: userId || this.$route.query.entId
      }
      // 新产品上报营销线索 添加参数
      if (window.location.pathname.indexOf('productCus') !== -1) {
        params.field = {
          name: 'realmVersion',
          value: 'PRODUCT_V1'
        }
      }
      // 财富干货上报营销线索 添加参数
      if (window.location.pathname.indexOf('wealthNews') !== -1) {
        params.field = {
          name: 'realmVersion',
          value: 'ARTICLE_GENE_WEALTH'
        }
      }
      if (this.$route.query.isH5) {
        params.shareType = this.$route.query.shareType
        params.shareTime = timeFormat(Number(this.$route.query.shareTime), 'T')
      }
      if (this.$route.query.activityId) {
        params.activityId = this.$route.query.activityId
        params.shareType = this.$route.query.shareType
        params.shareTime = timeFormat(Number(this.$route.query.shareTime), 'T')
      }
      if (this.$route.query.fromMark) {
        params.association = {
          realm: 'CONTENT'
        }
      }
      this.$store.dispatch('MARKETING_API_ACTION', params).then(async (res) => {
        if (res.success && res.param) {
          this.$store.commit('MARKETING_WECHATID', res.param.wechatInfoId)
          this.$store.commit('MARKETING_ACTIVITYID', res.param.activityId)
          window.localStorage.setItem(this.$route.query.entId + 'wechatId', res.param.wechatInfoId)
          await this.getShareId()
          this.judgeHasIM()
          this.getWxUserInfo(res.param.wechatInfoId)
          let time = 0
          if (isShare) {
            this.setShare({type, aboutAccountants, faId})
          } else {
            this.$wxHideOnly()
          }
          try {
            this.getDetail({type, aboutAccountants, faId})
          } catch {

          }
          try {
            this.sendLiveViewCord(res.param.wechatInfoId)
          } catch {

          }
          /* 回调函数 */
          if (callback) {
            console.error('1')
            console.log(callback)
            callback()
          }
          setInterval(() => {
            time = 5 + time
            this.getResidenceTime(res.param.activityId, time)
          }, 5000)
        } else if(!res.success) {
          this.$toast('授权失败！')
        }
      })
    },
    getAuthorize () {
      let params = {}
      params.param = {}
      params.param.value = encodeURIComponent(window.location.href.split('#')[0])
      this.$store.dispatch('WECHAT_INFO', params).then((res) => {
        if (res.success) {
          let weChatInfo = res.data
          let url = window.location.href
          url = delUrlParam('code', url)
          url = delUrlParam('state', url)
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            'appid=' + weChatInfo.appId + '&redirect_uri='
            + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo' +
            '&state=STATE#wechat_redirect'
        }
      })
    },
    getResidenceTime (activityId, duration) { // 记录停留时间
      let params = {
        activityId: activityId,
        duration: duration
      }
      this.$store.dispatch('MARKETING_API_DURATION', params).then((res) => {
      })
    },
    getWxUserInfo (wechatId) {
      let params = {
        wechatInfoId: wechatId
      }
      this.$store.dispatch('MARKETING_API_WECHAT_LIST', params).then((res) => {
        if (res.code === 0) {
          this.$store.commit('MARKETING_AVATAR', res.param.avatar)
          this.$store.commit('MARKETING_NICKNAME', res.param.nickname)
        }
      })
    },
    async getShareId () {
      let params = {
        timeStamp: new Date().getTime(),
        shareType: 'SHARE_CHAT'
      }
      let paramsCircle = {
        timeStamp: new Date().getTime(),
        shareType: 'SHARE_MOMENTS'
      }
      let [resFriends, resCircle] = await Promise.all([
        this.$store.dispatch('MARKETING_API_UUID', params),
        this.$store.dispatch('MARKETING_API_UUID', paramsCircle)
      ])

      if (resFriends.code === 0) {
        this.$store.commit('MARKETING_SHAREID_FRIENDS', resFriends.param)
      } else {
        this.$toast(resFriends.msg)
      }
      if (resCircle.code === 0) {
        this.$store.commit('MARKETING_SHAREID_CIRCLE', resCircle.param)
      } else {
        this.$toast(resCircle.msg)
      }
    },
    // 判断是否开通Im
    judgeHasIM () {
      let params = {
        data: {
          endId: this.$route.query.entId
        },
        name: 'im.expert.config'
      }
      this.$store.dispatch('NEW_WBS_API_IM', params).then((res) => {
        if (res.code === 0) {
          if (res.value.enableIm) {
            this.$store.commit('WBS_SET_HASIM', true)
            // this.hasIM = true
            // let unionid = this.$getCookie('unionid')
            // if (unionid) {
            //   this.toBuildIM()
            // }
          }
        } else {
          this.$toast(res.msg)
        }
      })
    }
  }
}
