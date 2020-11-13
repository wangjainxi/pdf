import { handleTime } from '@/utils/com-methods'

export const audioComponents = {
  data () {
    return {
      audioSrc: '', // 音频地址
      allowPaly: false, // 是否允许点击播放按钮
      audioPlay: false, // 播放暂停按钮
      cTime: '00:00', // 当前播放时间
      dTime: '00:00', // 音频总时长
      duration: 0, // 音频总时长
      loading: false, // 是否加载中
      seek: 0, // 开始时间
      player: '', // audio
    }
  },
  methods: {
    // 设置数据
    setData (url, duration) {
      this.setNoLoginData(url)
      this.duration = duration
      this.dTime = handleTime(duration) || '00:00'
    },
    setNoLoginData (url) {
      this.initAudioData(0, 0)
      this.initAudio(url)
    },
    // 初始化音频播放器
    initAudio (source) {
      console.log(source)
      this.audioSrc = source
      this.$nextTick(() => {
        this.player = this.$refs.audio
        this.autoPlay()
      })
    },
    // 自动播放
    autoPlay () {
      this.audioPlay = false
      this.loading = false
      this.initMethods()
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
      this.cTime = '00:00'
    },
    // 初始化方法
    initMethods () {
      this.getReadyState()
      this.getTimeupdate()
      this.initAudioBtns()
    },
    // 监听播放器状态
    getReadyState () {
      setInterval(() => {
        if (this.player.readyState === 4) {
          this.loading = false
        } else {
          this.loading = true
        }
        if (this.player.paused) {
          this.audioPlay = false
        } else {
          this.audioPlay = true
        }
      }, 1000)
    },
    // 监听播放器播放时间变化
    getTimeupdate () {
      this.player.addEventListener('timeupdate', () => {
        this.setPlayingTime()
      })
    },
    // 点击播放暂停按钮
    audioState () {
      console.log(this.allowPaly)
      if (!this.allowPaly) {
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
    // continuePlay () {
    //   if (this.mediaType === 0) {
    //     this.initAudio(this.audioItemInfo.fullUrl)
    //   } else {
    //     this.loading = true
    //     this.audioPlay = true
    //     this.player.play()
    //     this.toAllowClick()
    //   }
    // },
    // 设置播放器时间
    setPlayingTime () {
      const musicCTime = this.player.currentTime
      const musicDTime = this.player.duration
      if (!this.duration) {
        this.duration = musicDTime
      }
      this.cTime = handleTime(musicCTime) || '00:00'
      this.dTime = handleTime(musicDTime) || '00:00'
      if (this.isTopic) return false
      const musicBar = this.$refs.runbar // 颜色进度条所在对象
      musicBar.style.width = (musicCTime / musicDTime) * 100 + '%'
    },
    // 初始化播放器进度条
    initAudioBtns () {
      this.allowPaly = true
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
    // 点击进度条事件
    playMusic (e) {
    }
  }
}
