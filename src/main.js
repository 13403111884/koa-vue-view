import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createStore } from './store'
import { createRouter } from './router'
import 'view-design/dist/styles/iview.css'
import '@/assets/styles/index.styl'

const Util = require.context('./util/', false, /\.js$/)
Util.keys().forEach(key => {
  Vue.use(Util(key).default)
})

Vue.config.productionTip = false

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
