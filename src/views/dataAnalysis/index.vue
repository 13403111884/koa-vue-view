<template>
  <div>
    <!-- <div id="dataBar">图标：{{analysisList}}</div> -->
    <div v-if="false">
        <button @click="start">开始录制</button>
        <button @click="stop">停止录制</button>
        <button @click="pictureInPicture">画中画</button>
    </div>
    <div
      class="videoBox"
      ref="stroll-webrtc-box"
      @mouseenter="videoState.hideControl = true"
      @mouseleave="videoState.hideControl = false">
        <video
          @click="touchVideo"
          src="./Moz_Doc_0329_GetInvolved_ST.webm"
          preload="metadata"
          width="640"
          height="360"
          ref="stroll-webrtc-stream"
        ></video>
        <!-- <video @click="touchVideo" autoplay width="640" height="360" ref="stroll-webrtc-stream"></video> -->
        <template v-if="videoControl">
          <transition name="fade">
            <div
              class="custom-video_control"
              v-show="videoState.hideControl || !videoState.play" >
                <div class="head"  v-if="false">
                  <button></button>
                </div>
                <div class="content" v-if="false">
                  <ul></ul>
                  <input type="text">
                  <button>发送</button>
                </div>
                <div class="foot">
                  <button
                    @click="playOrPause('playOrPause')">
                      {{videoState.play ? '暂停' : '播放'}}
                  </button>
                  <div
                    class="progressBarBG">
                      <div
                        @mousedown="handlePrograssDown"
                        @mousemove="handlePrograssMove"
                        @mouseup="handlePrograssUp"
                        class="progressBarBGOutside"
                        ref="stroll-webrtc-progress-outside">
                        <span
                          
                          class="progressBarBGInside"
                          ref="stroll-webrtc-progress-inside"
                        ></span>
                        <span 
                          class="progressBarBGInsidePoint"
                          ref="stroll-webrtc-progress-point"
                        ></span>
                      </div>
                  </div>
                  <div class="volume">
                    <span class="volumePlay">音量</span>
                    <div
                      class="volumeBG"
                      ref="stroll-webrtc-volume"
                      @mousedown="handleVolPrograssDown"
                      @mousemove="handleVolPrograssMove"
                      @mouseup="handleVolPrograssUp">
                        <div
                          class="volumeBGOutside"
                          ref="stroll-webrtc-volume-outside">
                            <span
                              class="volumeBGInside"
                              ref="stroll-webrtc-volume-inside"></span>
                            <span
                              class="volumeBGPoint"
                              ref="stroll-webrtc-volume-point"></span>
                        </div>
                    </div>
                  </div>
                  <div class="timeProgress">
                    <span>{{videoState.currentTime || "00:00"}} </span>
                      /
                    <span> {{videoState.duration || "00:00"}}</span>
                  </div>
                  <button
                    @click="setFullScreen">
                      {{videoState.fullScreenStatu ? '关闭' : ''}}全屏
                  </button>
                  <button @click="pictureInPicture">画中画</button>
                </div>
            </div>
          </transition>
        </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。
  // 注意，由于此函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store }) {
    return store.dispatch('getAnalysis').then(() => { })
  },
  data () {
    return {
      videoRefs: {
        video: null,
        videoOut: null,
        videoIns: null,
        videoPoi: null,
        videoVolume: null,
        volumeOut: null,
        volumeIns: null,
        volumePoi: null
      },
      videoControl: true, // 工具栏是否需要
      strollWebrtcBox: null, // 视频盒子
      videoPublicTimeout: null, // 工具栏定时器
      volProcessHeight: 0,
      processWidth: 0,
      videoOption: {
        src: '', //视频
        poster: '', // 初始化占位图片
        volume: 20
      },
      videoState: {
        play: false, //播放状态
        hideControl: false, // 工具显示状态
        playState: false, // 记录播放状态
        distance: 0, // 移动的距离
        leftInit: 0, // 当前进度初始偏移量
        downState: false, // 鼠标点击进度条
        fullScreenStatu: false, // 全屏状态
        duration: 0, // 视频总时长
        currentTime: 0, // 视频当前播放时长
      },
      voiceState: { // 同上
        distance: 0, // 移动的距离
        downState: false, // 鼠标点击进度条
        topInit: 0 // 当前进度初始偏移量
      },
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.videoRefs.video = this.$refs['stroll-webrtc-stream']

      this.videoRefs.videoOut = this.$refs['stroll-webrtc-progress-outside']
      this.videoRefs.videoIns = this.$refs['stroll-webrtc-progress-inside']
      this.videoRefs.videoPoi = this.$refs['stroll-webrtc-progress-point']

      this.videoRefs.videoVolume = this.$refs['stroll-webrtc-volume']
      this.videoRefs.volumeOut = this.$refs['stroll-webrtc-volume-outside']
      this.videoRefs.volumeIns = this.$refs['stroll-webrtc-volume-inside']
      this.videoRefs.volumePoi = this.$refs['stroll-webrtc-volume-point']

      this.videoRefs.video.currentTime = 1
      this.processWidth = this.videoRefs.videoOut.clientWidth
      this.videoState.leftInit = this.getOffset(this.videoRefs.videoOut).left
      this.videoRefs.video.volume = this.videoOption.volume / 100 // 设置初始化声音
      this.fullscreenMonitor()
      // this.pictureInPictureMonitor()
      this.durationMonitor()
      this.volumeMonitor()
    })
  },
  methods: {
    start () { // 录频开始
      navigator.getUserMedia_ = (navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia || '')
      if (navigator.getUserMedia_) {
        navigator.getUserMedia_({
          audio: false, video: { width: 640, height: 360 }
        },(stream) => {
          this.videoRefs.video.srcObject = stream
        },function(err) {
          console.log(err)
        })
      }
    },
    stop () { // 录频停止
      this.videoRefs.video.pause()
      this.videoRefs.video.srcObject = null
    },
    playOrPause (Status) { // 播放或停止
      if (this.videoState.play) {
        this.pause(Status)
      } else {
        this.play(Status)
      }
    },
    async play (Status) { // 播放按钮事件
      if(Status === 'playOrPause') this.videoState.playStatusRecord = true
      this.videoState.play = true
      this.videoRefs.video.play()
    },
    async pause (Status) { // 暂停按钮事件
      if(Status === 'playOrPause') this.videoState.playStatusRecord = false
      this.videoRefs.video.pause()
      this.videoState.play = false
      this.videoState.hideControl = true
    },
    handlePrograssMove(e) { //  监听移动进度条事件，同步播放相关事件
      if(!this.videoState.downState) return //如果没有通过鼠标点击起点，则直接不进行下面计算
      let disX = e.clientX - this.videoState.leftInit
      // 进行边界判断
      if(disX > this.processWidth) {
        disX = this.processWidth
      }
      if(disX < 0) {
        disX = 0
      }
      this.videoState.distance = disX
      // 计算当前的currentTime
      this.videoRefs.video.currentTime = this.videoState.distance / this.processWidth * this.videoRefs.video.duration
    },
    handlePrograssDown(e) { // 监听点击进度条事件，方便获取初始点击的位置
      this.videoState.downState = true //按下鼠标标志
      this.pause() // 视频暂时停止
      this.videoState.distance = e.clientX - this.videoState.leftInit //记录点击的离起点的距离
    },
    handlePrograssUp() { //松开鼠标，播放当前进度条视频
      this.videoState.downState = false
      // 计算点击此处的currentTime
      this.videoRefs.video.currentTime = this.videoState.distance / this.processWidth * this.videoRefs.video.duration
      // 页面回显的currentTime数据
      this.videoState.currentTime = this.timeTranslate(this.videoRefs.video.currentTime)
      // 这个是判断当前视频是在播放状态进行点击还是在暂停状态进行点击的
      if(this.videoState.playStatusRecord) {
        this.play('playOrPause')
      }
    },
    handleVolPrograssDown(e) { // 监听声音点击事件
      this.voiceState.topInit = this.getOffset(this.videoRefs.volumeOut).top
      this.volProcessHeight = this.videoRefs.volumeOut.clientHeight
      this.voiceState.downState = true //按下鼠标标志
      this.voiceState.distance = e.clientY - this.voiceState.topInit
    },
    handleVolPrograssMove(e) { // 监听声音进度条移动事件
      if(!this.voiceState.downState) return
      let disY = this.voiceState.topInit + this.volProcessHeight - e.clientY
      if(disY > this.volProcessHeight - 2) {
        disY = this.volProcessHeight - 2
      }
      if(disY < 0) {
        disY = 0
      }
      this.voiceState.distance = disY
      const volume = this.voiceState.distance / this.volProcessHeight
      this.videoRefs.video.volume = volume
      this.videoOption.volume = Math.round(this.videoRefs.video.volume * 100)
    },
    handleVolPrograssUp() { // 监听声音鼠标离开事件
      this.voiceState.downState = false // 按下鼠标标志
      const volume = 1 - (this.voiceState.distance / this.volProcessHeight)
      this.videoRefs.video.volume = volume
      this.videoOption.volume = Math.round(this.videoRefs.video.volume * 100)
    },
    getOffset(node, offset) { // 获取当前屏幕下进度条的左偏移量和上偏移量
      if(!offset) {
        offset = {}
        offset.left = 0
        offset.top = 0
      }
      if(node === document.body || node === null) {
        return offset
      }
      offset.top += node.offsetTop
      offset.left += node.offsetLeft
      return this.getOffset(node.offsetParent, offset)
    },
    pictureInPicture () { // 开启画中画
      if (this.videoRefs.video !== document.pictureInPictureElement) {
        this.videoRefs.video.requestPictureInPicture()
        this.pictureInPictureMonitor()
      } else {
        document.exitPictureInPicture()
      }
    },
    volumeMonitor () { // 音量监听
      this.videoRefs.video.addEventListener("volumechange", () => {
        const percentage =  100 - this.videoRefs.video.volume * 100
        this.videoRefs.volumeIns.style.height = percentage + '%'
        this.videoRefs.volumePoi.style.bottom = percentage + '%'
      })
    },
    timeTranslate (t) { // 时间转化
      let m = Math.floor(t / 60)
      m < 10 && (m = '0' + m)
      return m + ":" + (t % 60 / 100 ).toFixed(2).slice(-2)
    },
    durationMonitor () { // 播放时长监听
      this.videoRefs.video.addEventListener('loadedmetadata', () => { // 获取视频总时长
        this.videoState.duration = this.timeTranslate(this.videoRefs.video.duration - 1)
      }, false)
      this.videoRefs.video.addEventListener("timeupdate", () => { // 监听视频播放过程中的时间
        const percentage = 100 * this.videoRefs.video.currentTime / this.videoRefs.video.duration
        // inside进度条长度
        this.videoRefs.videoIns.style.width = percentage + '%'
        // point移动变化
        this.videoRefs.videoPoi.style.left = percentage - 1 + '%'

        this.videoState.currentTime = this.timeTranslate(this.videoRefs.video.currentTime - 1)
      }, false)
      this.videoRefs.video.addEventListener('ended', function () {  
        this.videoState.playStatusRecord = false
        this.videoState.play = false
        this.videoState.hideControl = true
      }, false)
    },
    fullscreenMonitor () { // 全屏监听
      document.addEventListener('fullscreenchange', () => {
        this.videoState.fullScreenStatu = !this.videoState.fullScreenStatu
        !this.videoState.fullScreenStatu && this.exitFullscreen(false)
      })
    },
    pictureInPictureMonitor () { // 画中画监听
      let pipWindow = null
      this.videoRefs.video.addEventListener('enterpictureinpicture', event => {
        pipWindow = event.pictureInPictureWindow // 获取当前 pip 窗口 ?
        pipWindow.addEventListener('resize', this.pipWindowResize, false)
      })

      this.videoRefs.video.addEventListener('leavepictureinpicture', () => {
        pipWindow.removeEventListener('resize', this.pipWindowResize, false)
      })
      // this.videoRefs.video.addEventListener('enterpictureinpicture', () => {
      //   this.videoRefs.video.addEventListener('playing', this.videoPlaying)
      //   this.videoRefs.video.addEventListener('pause', this.videoPause)
      // })
      // this.videoRefs.video.addEventListener('leavepictureinpicture',() => {
      //   this.videoRefs.video.removeEventListener('playing', this.videoPlaying)
      //   this.videoRefs.video.removeEventListener('pause', this.videoPause)
      //   if (this.videoState.playStatusRecord) {
      //     this.play()
      //   }
      // })
    },
    videoPlaying () {
      this.videoState.playStatusRecord = true
      // this.videoState.play = true
    },
    videoPause () {
      // this.videoState.play = false
      this.videoState.playStatusRecord = false
    },
    touchVideo () { // 鼠标移上显示工具
      if (!this.videoState.play) return 
      if (this.videoState.hideControl) {
        this.videoState.hideControl = false
        clearTimeout(this.videoPublicTimeout)
        return
      }
      this.videoState.hideControl = true
      this.videoPublicTimeout = setTimeout(() => {
        this.videoState.hideControl = false
      }, 3000)
    },
    pipWindowResize (event) { // 检测画中画 窗口大小
      console.log(`> Window size changed to ${event.srcElement.width}x${event.srcElement.height}`)
      // chrome 建议根据 window 尺寸大小动态调节 video 质量
    },
    setFullScreen () { // 全屏切换
      if (this.videoState.fullScreenStatu) {
        this.exitFullscreen(true)
      } else {
        this.fullScreen()
      }
    },
    fullScreen () { // 全屏
      const ele = document.documentElement
      if (ele.requestFullscreen) {
        ele.requestFullscreen()
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen()
      } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen()
      }
      this.strollWebrtcBox = this.$refs['stroll-webrtc-box']
      // 对应的video标签大小100%
      this.strollWebrtcBox.style.position = 'fixed'
      this.strollWebrtcBox.style.left = 0
      this.strollWebrtcBox.style.top = 0
      this.strollWebrtcBox.style.width = '100%'
      this.strollWebrtcBox.style.height = '100%'
      this.videoRefs.video.style.width = '100%'
      this.videoRefs.video.style.height = '100%'
    },
    exitFullscreen (is) { // 退出全屏
      if (is) {
        let de = document
        if (de.exitFullscreen) {
          de.exitFullscreen()
        } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen()
        } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen()
        }
      }
      // 返回初始化值
      this.strollWebrtcBox.style.position = 'relative'
      this.strollWebrtcBox.style.width = '640px'
      this.strollWebrtcBox.style.height = '360px'
      this.videoRefs.video.style.width = '640px'
      this.videoRefs.video.style.height = '360px'
    },
  },
  computed: {
    ...mapGetters(['analysisList'])
  }
}
</script>

<style lang="stylus" scoped>
toolbarHeight = 30px
videoPublic()
  position absolute
  width 100%
  height toolbarHeight
  background-color rgba(225, 225, 225, .5)
/* 播放时间 */
.timeProgress
  margin 0 6px
  span
    color #000
    line-height toolbarHeight
/* 盒子 */
.videoBox
  display inline-block
  overflow hidden
  position relative
  background-color #000
  height 360px
  .head
    videoPublic()
    right 0
    top 0
  .content
    videoPublic()
    left 0
    width 300px
    height: 220px
    bottom toolbarHeight
    ul
      height 190px
      margin-bottom 2px
  .foot
    videoPublic()
    display flex
    left 0
    bottom 0
/* 控制栏进度条 */
.progressBarBG
  flex 1
  height 100%
  display flex
  justify-content center
  align-items center
  margin 0 10px
/* 控制栏进度条 —— 总长度 */
.progressBarBGOutside
  width 90%
  height 5px
  border-radius 2.5px
  background-color #aaa
  position relative
  cursor pointer
/* 控制栏进度条 —— 播放长度 */
.progressBarBGInside
  position absolute
  display inline-block
  width 0
  height 100%
  border-radius 2.5px
  left 0
  top 0
  background-color: #fff
  transition: all 0.2s
/* 控制栏进度条 —— 播放点 */
.progressBarBGInsidePoint
  display inline-block
  width 10px
  height 10px
  background-color #fff
  border-radius 50%
  position absolute
  top -2.5px
  left -1%
  transition all 0.2s
/* 控制栏 —— 声音 */
.volume
  display flex
  flex-direction row
  justify-content center
  align-items center
  color #fff
  position relative
.volume:hover > .volumeBG
  display block
.volumePlay
  z-index 10
.volumeBG
  display none
  position absolute
  width 20px
  height 100px
  background-color rgba(0, 0, 0, .55)
  margin-left -10px
  left 50%
  bottom 30px
  border-radius 15px
.volumeBGOutside
  width 5px
  height 82px
  border-radius 2.5px
  background-color #aaa
  position absolute
  left 50%
  transform translate3d(-50%, 10%, 0)
  cursor pointer
.volumeBGInside
  display inline-block
  position absolute
  width 100%
  bottom 0
  left 0
  border-radius 2.5px
  background-color #fff
  height 0
.volumeBGPoint
  display inline-block
  width 10px
  height 10px
  background-color #fff
  border-radius 50%
  position absolute
  left -2.5px
  bottom -1px
/* 控制栏隐藏动画 */
.fade-enter-active
  transition all .3s ease
.fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.fade-enter, .fade-leave-to
  transform translateY(50px)
  opacity 0
  
</style>
