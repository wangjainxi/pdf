import { handleTime } from '@/utils/com-methods'

export const audioComponents = {
  data () {
    return {
      audioItemInfo: {}, // 当前音频的信息
      audioSrc: '', // 音频地址
      allowPaly: false, // 是否允许点击播放按钮
      audioPlay: false, // 播放暂停按钮
      alreadyCharged: false, // 是否已调用扣费
      cTime: '00:00', // 当前播放时间
      dTime: '00:00', // 音频总时长
      durationTimeOut: null,
      duration: 0, // 音频总时长
      isFullUrl: false,
      loading: false, // 是否加载中
      mediaType: 0, // 0 无试听 >0 有试听 -1 全试听
      supplyApi: {}, // 当前页面的详情
      seek: 0, // 开始时间
      player: '', // audio
      urlToken: '' // 登录token
    }
  },
  methods: {
    // 设置数据
    setData (detail) {
      this.supplyApi = detail
      this.mediaType = Number(detail.trailersDuration)
      this.audioItemInfo = detail.audios[0] || {}
      this.urlToken = this.$getCookie('token')
      this.judgeAudioType()
    },
    // 判断是否是登录状态
    judgeAudioType () {
      if (this.urlToken) {
        if ((Number(this.audioItemInfo.duration) - Number(this.supplyApi.playDuration) < 5)) {
          this.setLoggedData(0)
        } else {
          this.setLoggedData(this.supplyApi.playDuration)
        }
      } else {
        this.setNoLoginData(0)
      }
    },
    // 设置未登录状态的数据
    setNoLoginData () {
      this.initAudioData(0, this.audioItemInfo.duration)
      if (this.mediaType !== 0) {
        this.initAudio(this.audioItemInfo.fullUrl)
      }
    },
    // 设置登录状态的数据
    setLoggedData (seek) {
      this.initAudioData(seek, this.audioItemInfo.duration)
      this.initAudio(this.audioItemInfo.fullUrl)
    },
    // 初始化音频播放器
    initAudio (source) {
      this.audioSrc = source
      this.$nextTick(() => {
        this.player = this.$refs.audio
        this.autoPlay()
      })
    },
    // 自动播放
    autoPlay () {
      try {
        WeixinJSBridge.invoke('getNetworkType', {}, (e) => {
          this.allowPaly = true
          this.bindCanplaythrough()
        })
      } catch {
        this.audioPlay = false
        this.loading = false
        this.bindCanplaythrough()
      }
    },
    // 断点续播监听事件
    bindCanplaythrough () {
      let seeked = false
      this.player.addEventListener('canplaythrough', (e) => {
        if(!seeked) {
          seeked = true
          this.initMethods()
        }
      })
    },
    // 初始化播放器数据
    initAudioData (seek, duration) {
      this.seek = seek
      this.duration = duration
      this.cTime = '00:00'
      this.dTime = handleTime(this.duration) || '00:00'
    },
    // 初始化方法
    initMethods () {
      this.getReadyState()
      this.getTimeupdate()
      this.initAudioBtns()
      this.saveCurrentTime()
      this.audioSeek(this.seek)
    },
    // 监听播放器状态
    getReadyState () {
      setInterval(() => {
        if (this.player.readyState === 4) {
          this.loading = false
        } else {
          this.loading = true
        }
      }, 1000)
    },
    // 监听播放器播放时间变化
    getTimeupdate () {
      this.player.addEventListener('timeupdate', () => {
        this.setPlayingTime()
        this.callAboutApis()
      })
    },
    // 点击播放暂停按钮
    audioState () {
      if (!this.allowPaly) {
        this.urlToken = this.$getCookie('token')
        if (this.mediaType === 0 && !this.urlToken) {
          this.showPromptType = 2
          this.$refs.promptDialog.show()
        }
        return false
      }
      if (this.audioPlay) {
        this.audioPlay = false
        this.player.pause()
      } else {
        this.loading = true
        this.audioPlay = true
        this.player.play()
      }
    },
    continuePlay () {
      if (this.mediaType === 0) {
        this.initAudio(this.audioItemInfo.fullUrl)
      } else {
        this.loading = true
        this.audioPlay = true
        this.player.play()
        this.toAllowClick()
      }
    },
    // 设置播放器时间
    setPlayingTime () {
      const musicCTime = this.player.currentTime
      this.cTime = handleTime(musicCTime) || '00:00'

      if (this.isTopic) return false
      const musicBar = this.$refs.runbar // 颜色进度条所在对象
      musicBar.style.width = (musicCTime / this.duration) * 100 + '%'
    },
    // 根据时间变化调用相关接口
    callAboutApis () {
      // const musicCTime = this.player.currentTime
      // if (musicCTime >= 60) {
      //   this.toCharge()
      // }
      // this.urlToken = this.$getCookie('token')
      // if (this.mediaType != -1 && musicCTime >= this.mediaType && !this.urlToken && this.showPromptType != 3) {
      //   /*
      //   * 类型是 有试听
      //   * 当前播放时长大于等于试听时长
      //   * 未登录
      //   * 没出现过提醒登录tips
      //   * 扣费未失败
      //   * */
      //   this.audioPlay = false
      //   this.showPromptType = 0
      //   this.removeAudioBtns()
      //   this.player.pause()
      //   this.$refs.promptDialog.show()
      // }
    },
    // 初始化播放器进度条
    initAudioBtns () {
      this.allowPaly = true
      if (this.isTopic) return false
      const musicBar = this.$refs.runbar // 颜色进度条所在对象
      const musicWidth = this.$refs.runfatbar.offsetWidth
      this.bindTouchstart(musicBar, musicWidth)
      this.bindTouchmove(musicBar, musicWidth)
      this.bindTouchend(musicBar, musicWidth)
    },
    bindTouchstart (obj) {
      obj.addEventListener('touchstart', (event) => {
        this.player.play()
      })
    },
    bindTouchmove (obj, musicWidth) {
      obj.addEventListener('touchmove', (event) => {
        event.preventDefault()
        const events = event.targetTouches[0].pageX - this.$refs.leftDiv.offsetWidth // 获得触摸拖动的距离
        let ratio = events / musicWidth
        if (ratio >= 1) ratio = 1
        obj.style.width = ratio * 100 + '%' // 计算进度条所在比例宽度
        this.player.pause() // 触摸拖动时停止播放

        if (!this.duration) return false
        if (ratio < 0) {
          this.cTime = '00:00'
        } else {
          let musicTime = ''
          if (ratio > 1) {
            musicTime = this.duration
          } else {
            musicTime = this.duration * ratio
          }
          this.cTime = handleTime(musicTime)
        }
      })
    },
    bindTouchend (obj, musicWidth) {
      obj.addEventListener('touchend', (event) => {
        event.preventDefault()
        if (this.cTime === '00:00') {
          obj.style.width = '0%'
          return false
        }
        const touwidth = (obj.offsetWidth / musicWidth) // 计算进度条所在比例
        this.player.play()
        this.audioSeek(parseInt(this.duration * touwidth)) // 通过所在比例赋值给音频应在的播放时间
        this.audioPlay = true // 更改播放暂停按钮为播放
      })
    },
    // 断点续播设置时间
    audioSeek (seekTime) {
      this.seek = 0
      if('fastSeek' in this.player){
        this.player.fastSeek(seekTime) // 改变audio.currentTime的值
      } else {
        this.player.currentTime = seekTime
      }
    },
    // 记录播放时间
    saveCurrentTime () {
      let endPlay = setInterval(() => {
        let playTime = this.player.currentTime
        if (playTime) {
          let params = {
            data: {
              visitRecordId: this.supplyApi.visitRecordId,
              playedTime: parseInt(playTime),
              id: this.supplyApi.id
            },
            name: 'ie.h5.course.playtime'
          }
          this.$store.dispatch('NEW_WBS_API_IE', params).then((res) => {
          })
        }
      }, 5000)
    },
    // 观看60s收费
    toCharge () {
      if (this.alreadyCharged) return false
      this.alreadyCharged = true
      let params = {
        data: {
          entId: this.$route.query.entId,
          outId: this.$route.query.faId,
          wechatId: this.$store.state.marketApi.wechatId,
          entCourseId: this.supplyApi.id,
          visitRecordId: this.supplyApi.visitRecordId,
        },
        name: 'ie.h5.course.charge'
      }
      this.$store.dispatch('NEW_WBS_API_IE', params).then((res) => {
        if (res.code == 0) {
          // this.audioPlay = false
          // this.player.pause()
          // this.removeAudioBtns()
          // this.showPromptType = 3
          // this.$refs.promptDialog.show()
        } else {
          this.audioPlay = false
          this.player.pause()
          this.removeAudioBtns()
          this.showPromptType = 3
          this.$refs.promptDialog.show()
        }
      }).catch(() => {
        this.alreadyCharged = false
      })
    },
    // 点击进度条事件
    playMusic (e) {
    }
  }
}
