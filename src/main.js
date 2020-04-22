import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createRouter } from './router'
import { createStore } from './store'
// import titleMixin from './util/title'
import * as filters from './util/filters'
import mapping from './util/mapping'
import tools from './util/tools'
import Iview from './util/iview'
import 'view-design/dist/styles/iview.css'
import './assets/css/index.less'
Vue.use(Iview)
Vue.config.productionTip = false

// 混合处理标题
// Vue.mixin(titleMixin)

// 注册全局筛选器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局实方法
Vue.prototype.$mapping = mapping
Object.keys(tools).forEach(key => {
  Vue.prototype[`$${key}`] = tools[key]
})

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
