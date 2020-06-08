<template>
  <div>
    <div id="dataBar">图标：{{analysisList}}</div>
    <div v-sDragSort class="div">
      <div class="box1">
        <ul>
          第一级
          <li id="1">1</li>
          <li id="2">2</li>
          <li>
            <ul>
              第二级
              <li id="3">3</li>
              <li id="4">4</li>
              <li>
                <ul>
                  第三级
                  <li id="5">5</li>
                  <li id="6">6</li>
                  <li id="7">7</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="box2"></div>
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
