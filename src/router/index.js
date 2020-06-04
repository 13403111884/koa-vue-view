import Vue from 'vue'
import Router from 'vue-router'
import { createStore } from './../store'

const routes = createStore().getters.Juris

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      ...routes,
      {
        path: '/login',
        name: 'login',
        meta: { title: '登录', roles: [] },
        component: () => import(/* webpackChunkName: "index" */ './../components/loginReg/login')
      },
      {
        path: '/register',
        name: 'register',
        meta: { title: '注册', roles: [] },
        component: () => import(/* webpackChunkName: "index" */ './../components/loginReg/register')
      },
      {
        path: '*/:code',
        name: 'error',
        meta: { title: '错误提示', roles: [] },
        components: {
          error: () => import(/* webpackChunkName: "index" */ './../components/error'),
          304: () => import(/* webpackChunkName: "index" */ './../components/error/304'),
          400: () => import(/* webpackChunkName: "index" */ './../components/error/400'),
          401: () => import(/* webpackChunkName: "index" */ './../components/error/401'),
          403: () => import(/* webpackChunkName: "index" */ './../components/error/403'),
          404: () => import(/* webpackChunkName: "index" */ './../components/error/404'),
          500: () => import(/* webpackChunkName: "index" */ './../components/error/500'),
          503: () => import(/* webpackChunkName: "index" */ './../components/error/503')
        }
      }
    ]
  })
}
