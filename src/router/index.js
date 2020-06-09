import Vue from 'vue'
import Router from 'vue-router'

import Routes from './routes'

const setJurisdiction = (roles, item) => {
  if (item.meta && item.meta.roles && item.meta.roles.length) {
    return roles.some(role => item.meta.roles.includes(role))
  } else {
    return true
  }
}

const getRouter = (routes, roles) => {
  if (!routes) return
  const routerParams = routes.filter(item => {
    if (setJurisdiction(roles, item)) {
      if (item.children && item.children.length) {
        item.children = getRouter(item.children, roles)
      }
      return true
    }
    return false
  })
  Vue.prototype.$nav = routerParams
  return routerParams
}

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      ...getRouter(Routes, []),
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
