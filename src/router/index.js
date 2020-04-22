import Vue from 'vue'
import Router from 'vue-router'
import { createStore } from './../store'
// const Home = () => import(/* webpackChunkName: "index" */ './../components')

const routes = createStore().getters.Juris

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes
  })
}
