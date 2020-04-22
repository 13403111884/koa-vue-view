import Vue from 'vue'
import { createApp } from './main'
import ProgressBar from './components/ProgressBar'

// 路由切换时，页面数据加载指示器
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// 全局混合，当路由组件的参数发生变化时调用`asyncData`
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()
// 将服务端渲染的vuex数据，替换到客户端的vuex中
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(() => {})
    if (!asyncDataHooks.length) {
      return next()
    }
    // 触发加载指示器
    bar.start();
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        // 停止加载指示器
        bar.finish()
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})
