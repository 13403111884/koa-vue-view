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
      ref="stroll-webrtc-box">
        <video
          src="./videoplayback.mp4"
          preload="metadata"
          width="640"
          height="360"
          ref="stroll-webrtc-stream"
        ></video>
        <!-- <video @click="touchVideo" autoplay width="640" height="360" ref="stroll-webrtc-stream"></video> -->
        <template v-if="videoControl">
          <transition name="fade">
            <div
              tabindex="0"
              autofocus="autofocus"
              class="custom-video_control"
              @blur="videoBlur"
              @focus="videoFocus"
              @mouseenter="videoState.hideControl = true"
              @mouseleave="videoState.hideControl = false"> <!-- v-show="videoState.hideControl || !videoState.play" -->
                <div class="head"  v-if="false">
                  <button>头部</button>
                </div>
                <div
                  class="content" >
                  <!-- <ul></ul>
                  <input type="text">
                  <button>发送</button> -->
                  <div
                    class="content-left"
                    @click="touchVideo"
                  ></div>
                  <div @click="play('playOrPause')" class="content-middle" v-show="!videoState.play">
                    <IconSvg
                        icon-style="IconSvgStyle"
                        icon-class="icon-bofangqi-bofangxiaodianshi"
                      />
                  </div>
                  <div
                    class="content-right"
                    @click="touchVideo"
                  ></div>
                </div>
                <div class="foot" v-show="videoState.hideControl">
                  <div
                    class="progressBarBG"
                    @mouseleave="handlePrograssLeave"
                    @mousemove="handlePrograssMove"
                    @mouseup="handlePrograssUp">
                      <div
                        @mousedown="handlePrograssDown"
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
                  <div>
                    <div class="left">
                      <div @click="playOrPause('playOrPause')">
                        <IconSvg
                          icon-style="IconSvgStyle"
                          :icon-class="videoState.play
                            ? 'icon-bofangqi-zanting'
                            : 'icon-bofangqi-bofang'"
                        />
                      </div>
                      <div class="volume">
                        <div @click="muteOrNot">
                          <IconSvg
                            icon-style="IconSvgStyle"
                            :icon-class="videoState.voiceStatus"
                          />
                        </div>
                        <div
                          class="volumeBG"
                          ref="stroll-webrtc-volume"
                          >
                            <div
                              @mousedown="handleVolPrograssDown"
                              @mousemove="handleVolPrograssMove"
                              @mouseleave="handleVolPrograssLeave"
                              @mouseup="handleVolPrograssUp"
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
                        <span>{{videoState.currentTime || "00:00"}}</span>
                        <span> / </span>
                        <span>{{videoState.duration || "00:00"}}</span>
                      </div>
                    </div>
                    <div class="right">
                      <div @click="setFullScreen">
                        <IconSvg
                          icon-style="IconSvgStyle"
                          :icon-class="videoState.fullScreenStatu
                            ? 'icon-quxiaoquanping'
                            : 'icon-quanping'"
                        />
                      </div>
                      <div @click="pictureInPicture">
                        <IconSvg
                          icon-style="IconSvgStyle"
                          icon-class="icon-xiaochuangkou"
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </transition>
        </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconSvg from './svg'
export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。
  // 注意，由于此函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store }) {
    return store.dispatch('getAnalysis').then(() => { })
  },
  components: { IconSvg },
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
      dblclickPrograss: null,
      volProcessWidth: 0,
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
        InitialPlayTime: 1, // 初始化播放时间
        duration: 0, // 视频总时长
        currentTime: 0, // 视频当前播放时长
        voiceStatus: 'icon-icon--'
      },
      voiceState: { // 同上
        distance: 0, // 移动的距离
        downState: false, // 鼠标点击进度条
        leftInit: 0 // 当前进度初始偏移量
      },
    }
  },
  computed: {
    ...mapGetters(['analysisList'])
  },
  mounted () {
    this.$nextTick(() => {
      this.strollWebrtcBox = this.$refs['stroll-webrtc-box']
      this.videoRefs.video = this.$refs['stroll-webrtc-stream']

      this.videoRefs.videoOut = this.$refs['stroll-webrtc-progress-outside']
      this.videoRefs.videoIns = this.$refs['stroll-webrtc-progress-inside']
      this.videoRefs.videoPoi = this.$refs['stroll-webrtc-progress-point']

      this.videoRefs.videoVolume = this.$refs['stroll-webrtc-volume']
      this.videoRefs.volumeOut = this.$refs['stroll-webrtc-volume-outside']
      this.videoRefs.volumeIns = this.$refs['stroll-webrtc-volume-inside']
      this.videoRefs.volumePoi = this.$refs['stroll-webrtc-volume-point']

      this.processWidth = this.videoRefs.videoOut.clientWidth || 0
      this.videoRefs.video.currentTime = this.videoState.InitialPlayTime
      this.videoRefs.video.volume = this.videoOption.volume / 100 // 设置初始化声音
      this.fullscreenMonitor()
      this.pictureInPictureMonitor()
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
    },
    handlePrograssDown (e) { // 按下，监听点击进度条事件，方便获取初始点击的位置
      this.processWidth = this.videoRefs.videoOut.clientWidth || 0
      this.videoState.leftInit = this.getOffset(this.videoRefs.videoOut).left
      this.videoState.downState = true //按下鼠标标志
      // this.pause() // 视频暂时停止
      this.videoState.distance = e.clientX - this.videoState.leftInit //记录点击的离起点的距离
    },
    handlePrograssMove (e) { // 移动，监听移动进度条事件，同步播放相关事件
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
      const currentTime = this.videoState.distance / this.processWidth * this.videoRefs.video.duration
      // 计算当前的currentTime
      this.videoRefs.video.currentTime = currentTime < this.videoState.InitialPlayTime ? this.videoState.InitialPlayTime : currentTime
    },
    handlePrograssLeave () { // 离开
      if (this.videoState.downState) {
        this.handlePrograssUp()
      }
    },
    handlePrograssUp () { //松开鼠标，播放当前进度条视频
      this.videoState.downState = false
      const currentTime = this.videoState.distance / this.processWidth * this.videoRefs.video.duration
      // 计算点击此处的currentTime
      this.videoRefs.video.currentTime = currentTime < this.videoState.InitialPlayTime ? this.videoState.InitialPlayTime : currentTime
      // 页面回显的currentTime数据
      this.videoState.currentTime = this.timeTranslate(this.videoRefs.video.currentTime)
      // 这个是判断当前视频是在播放状态进行点击还是在暂停状态进行点击的
      if(this.videoState.playStatusRecord) {
        this.play('playOrPause')
      }
    },
    async getVoiceStatus () {
      let volume = +this.videoRefs.video.volume
      switch (true) {
        case (volume <= 0):
          this.videoState.voiceStatus = 'icon-jingyin'
          break
        case (volume < .3):
          this.videoState.voiceStatus = 'icon-icon--'
          break
        case (volume > .3 && volume < .6):
          this.videoState.voiceStatus = 'icon-icon--1'
          break
        case (volume > .6):
          this.videoState.voiceStatus = 'icon-icon--2'
          break
        default:
          // 。。。
          break
      }
    },
    async muteOrNot () {
      if (this.videoRefs.video.volume) {
        this.videoRefs.video.volume = 0
      } else {
        this.videoRefs.video.volume = this.videoOption.volume / 100
      }
      await this.getVoiceStatus()
    },
    handleVolPrograssDown (e) { // 监听声音点击事件
      this.voiceState.leftInit = this.getOffset(this.videoRefs.volumeOut).left
      this.volProcessWidth = this.videoRefs.volumeOut.clientWidth
      this.voiceState.downState = true //按下鼠标标志
      this.voiceState.distance = (e.clientX - this.voiceState.leftInit)
    },
    handleVolPrograssMove (e) { // 监听声音进度条移动事件
      if(!this.voiceState.downState) return
      let disX = (this.voiceState.leftInit + this.volProcessWidth) - e.clientX
      if(disX > this.volProcessWidth - 2) {
        disX = this.volProcessWidth - 2
      }
      if(disX < 0) {
        disX = 0
      }
      this.voiceState.distance = disX
      const volume = 1 - (this.voiceState.distance / this.volProcessWidth)
      this.videoRefs.video.volume = volume > 1 ? 1 : volume < 0 ? 0 : volume
      this.videoOption.volume = Math.round(this.videoRefs.video.volume * 100)
    },
    handleVolPrograssLeave () { // 监听音量按下移出
      if (this.voiceState.downState) {
        this.handleVolPrograssUp()
      }
    },
    handleVolPrograssUp (e) { // 监听声音鼠标离开事件
      e && this.handleVolPrograssMove(e)
      this.voiceState.downState = false // 按下鼠标标志
      const volume = 1 - (this.voiceState.distance / this.volProcessWidth)
      this.videoRefs.video.volume = volume > 1 ? 1 : volume < 0 ? 0 : volume
      this.videoOption.volume = Math.round(this.videoRefs.video.volume * 100)
    },
    getOffset (node, offset) { // 获取当前屏幕下进度条的左偏移量和上偏移量
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
        // this.pictureInPictureMonitor()
      } else {
        document.exitPictureInPicture()
      }
    },
    volumeMonitor () { // 音量监听
      this.videoRefs.video.addEventListener("volumechange", async () => {
        const volume = this.videoRefs.video.volume
        this.videoRefs.volumeIns.style.width = `${volume ? this.videoOption.volume : volume}%`
        this.videoRefs.volumePoi.style.left = `${volume ? this.videoOption.volume - 5 : volume}%`
        await this.getVoiceStatus()
      })
    },
    timeTranslate (t) { // 时间转化
      let m = Math.floor(t / 60)
      m < 10 && (m = `0${m > 0 ? m : 0}`)
      return `${m}:${(t > 0 ? t % 60 / 100 : 0).toFixed(2).slice(-2)}`
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
      })
      this.videoRefs.video.addEventListener('ended', () => {
        this.videoRefs.video.currentTime = this.videoState.InitialPlayTime 
        this.videoState.playStatusRecord = false
        this.videoState.play = false
        this.videoState.hideControl = true
      }, false)
    },
    videoBlur () { // 视频失去焦点
      window.removeEventListener('keydown', this.preventDefault)
    },
    videoFocus () { // 视频获取焦点
      window.addEventListener('keydown', this.preventDefault)
    },
    preventDefault (e) { // 禁止浏览器默认事件
      e.preventDefault()
      this.direction(e.keyCode)
    },
    direction (keyCode) { // 按键事件
      let volume = this.videoRefs.video.volume
      let currentTime = this.videoRefs.video.currentTime
      const duration = this.videoRefs.video.duration
      switch (keyCode) {
        case 13: // 回车
          this.fullScreen()
          break
        case 27: // Esc
          this.exitFullscreen(true)
          break
        case 32: // 空格
          this.playOrPause('playOrPause')
          break
        case 37: // 左
          currentTime -= (duration * 0.01)
          this.videoRefs.video.currentTime = currentTime > duration ? duration : currentTime
          this.videoState.currentTime = this.timeTranslate(this.videoRefs.video.currentTime)
          break
        case 38: // 上
          volume += 0.03
          this.videoRefs.video.volume = volume > 1 ? 1 : volume
          this.videoOption.volume = this.videoRefs.video.volume * 100
          break
        case 39: // 右
          currentTime += (duration * 0.01)
          this.videoRefs.video.currentTime = currentTime < this.videoState.InitialPlayTime ? this.videoState.InitialPlayTime : currentTime
          this.videoState.currentTime = this.timeTranslate(this.videoRefs.video.currentTime)
          break
        case 40: // 下
          volume -= 0.03
          this.videoRefs.video.volume = volume <0 ? 0 : volume
          this.videoOption.volume = this.videoRefs.video.volume * 100
          break
        default:
          // 。。。
          break
      }
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
          this.videoRefs.video.addEventListener('playing', this.videoPlaying)
          this.videoRefs.video.addEventListener('pause', this.videoPause)
      })

      this.videoRefs.video.addEventListener('leavepictureinpicture', () => {
        pipWindow.removeEventListener('resize', this.pipWindowResize, false)
          this.videoRefs.video.removeEventListener('playing', this.videoPlaying)
          this.videoRefs.video.removeEventListener('pause', this.videoPause)
          if (this.videoState.playStatusRecord) {
            this.play()
          } else {
            this.pause()
          }
      })
    },
    videoPlaying () { // 播放状态
      this.videoState.playStatusRecord = true
      // this.videoState.play = true
    },
    videoPause () { // 播放状态
      // this.videoState.play = false
      this.videoState.playStatusRecord = false
    },
    touchVideo () { // 鼠标移上显示工具
      // if (!this.videoState.play) return 
      // if (this.videoState.hideControl) {
      //   this.videoState.hideControl = false
      //   clearTimeout(this.videoPublicTimeout)
      //   return
      // }
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
    clicks (n,dom,fn) { //多次点击事件
      dom.removeEventListener('dblclick',null);
      n = +n || 0
      let count = 0
      let lastTime = 0 //用于记录上次结束的时间
      const handler = function (event) {
          const currentTime = new Date().getTime() //获取本次点击的时间
          if ((currentTime-lastTime) < 300) { // 如果本次点击的时间和上次结束时间相比大于300毫秒就把count置0
            count = count +1
          } else {
            dom.removeEventListener('click',null);
            count = 0
          }
          lastTime = new Date().getTime()
          if(count>=n-1){
              fn(event,n)
              count = 0
          }
      };
      dom.addEventListener('click',handler)
    }
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
div
  outline none
.oh
  overflow hidden
.fl
  float left
.fr
  float right
.clrb
  clear both
/** 盒子 */
.videoBox
  display inline-block
  overflow hidden
  position relative
  background-color #000
  user-select none
  height 360px
  .head
    videoPublic()
    right 0
    top 0
  .content
    videoPublic()
    left 0
    width 100%
    height: 100%
    background-color rgba(225, 225, 225, 0)
    display flex
    position relative
    .content-left
      flex-grow 5
    .content-right
      flex-grow 5
    .content-middle
      background-color rgba(225, 225, 225, .7)
      position absolute
      bottom 60px
      right 20px
      padding 12px 18px
      border-radius 9px
  .foot
    videoPublic()
    height 55px
    left 0
    bottom 0
    div
      display flex
    &>div
      margin 0 10px
      .right
        justify-content: flex-end;
        flex-grow 5
        &>div
          margin-left 6px
          display inline-block
      .left
        flex-grow 5
        &>div
          margin-right 6px
          display inline-block
/** 蒙板 mask*/
.custom-video_control
  position absolute
  width 100%
  height 100%
  top 0
  left 0
/** 播放时间 */
.timeProgress
  margin 0px 6px
  span
    color #000
    line-height toolbarHeight
/** 控制栏进度条 */
.progressBarBG
  // width 100%
  height 20px
/** 控制栏进度条 —— 总长度 */
.progressBarBGOutside
  width 100%
  height 6px
  border-radius 3px
  background-color #aaa
  position relative
  top 6px
  cursor pointer
/** 控制栏进度条 —— 播放长度 */
.progressBarBGInside
  position absolute
  display inline-block
  width 0
  height 100%
  border-radius 3px
  left 0
  top 0
  background-color: #fff
  transition: all 0.2s
/** 控制栏进度条 —— 播放点 */
.progressBarBGInsidePoint
  display inline-block
  width 10px
  height 10px
  background-color #fff
  border-radius 50%
  position absolute
  top -2px
  left -1%
  transition all 0.2s
/** 控制栏 —— 声音 */
.volume
  display flex
  flex-direction row
  justify-content center
  align-items center
  color #fff
  &>div
    display inline-block !important
  .volumePlay
    z-index 10
  .volumeBG
    height 30px
    width 100px
    // background-color rgba(0, 0, 0, .55)
    border-radius 15px
  .volumeBGOutside
    height 6px
    width 90px
    border-radius 2.5px
    background-color #aaa
    position relative
    left 50%
    margin-left -45px
    top 12px
    cursor pointer
  .volumeBGInside
    display inline-block
    position absolute
    width 0
    height 100%
    bottom 0
    left 0
    border-radius 2.5px
    background-color #fff
  .volumeBGPoint
    display inline-block
    width 10px
    height 10px
    background-color #fff
    border-radius 50%
    position absolute
    left -2.5px
    bottom -1.3px
/** 控制栏隐藏动画 */
.fade-enter-active
  transition all .3s ease
.fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.fade-enter, .fade-leave-to
  transform translateY(50px)
  opacity 0
/deep/ .IconSvgStyle
  width 30px
  height 30px
</style>
