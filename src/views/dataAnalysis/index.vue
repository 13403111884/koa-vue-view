<template>
  <div>
    <div id="dataBar">图标：{{analysisList}}</div>
    <button @click="onopen">开启Socket</button>
    <button @click="onclose">关闭Socket</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Socket from './socket.js'
export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。
  // 注意，由于此函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store }) {
    return store.dispatch('getAnalysis').then(() => { })
  },
  data () {
    return {
      websocketUrl: 'ws://localhost:9000/websocket',
      CreateWebSocket: null
    }
  },
  mounted () {
    // this.websocket()
    this.CreateWebSocket = new Socket(this.websocketUrl)
  },
  methods: {
    onopen () {
      this.CreateWebSocket.open()
      // this.CreateWebSocket.onopen = function(evt) {
      //   this.CreateWebSocket.send("前端向后端发送第一条数据")
      //   console.log(evt, 'onopen')
      // }
      // CreateWebSocket.onerror = function(evt) {
      //   console.log(evt, 'onerror')
      // }
      // CreateWebSocket.onclose = function(evt) {
      //   console.log(evt, 'onclose')
      // }
      // this.CreateWebSocket.onmessage = function(evt) {
      //   console.log(evt, 'onmessage')
      // }
    },
    onclose () {
      this.CreateWebSocket.close()
    }
  },
  computed: {
    ...mapGetters(['analysisList'])
  }
}
</script>

<style lang="stylus" scoped>
.div
  overflow hidden
  div
    float left
    width 300px
    height 300px
    display inline-block
    margin-right: 9px
    border 1px solid #000
    li
      border 1px solid #cccccc
</style>
