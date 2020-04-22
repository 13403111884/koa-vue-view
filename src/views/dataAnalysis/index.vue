<template>
  <div>
    <div id="dataBar">图标：{{analysisList}}</div>
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

<style lang="less" scoped>
</style>
