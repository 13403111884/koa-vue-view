import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

import state from './state'
import mutations from './mutations'

import routesList from './../router/routes'

const setJurisdiction = (roles, item) => {
  if (item.meta && item.meta.roles && item.meta.roles.length) {
    return roles.some(role => item.meta.roles.includes(role))
  } else {
    return true
  }
}

const getRouter = (routes, roles) => {
  if (!routes) return
  return routes.filter(item => {
    if (setJurisdiction(roles, item)) {
      if (item.children && item.children.length) {
        item.children = getRouter(item.children, roles)
      }
      return true
    }
    return false
  })
}

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    namespaced: true,
    state,
    mutations,
    getters: {
      movieList: state => state.movieList,
      analysisList: state => state.analysisList,
      Juris: () => routesList,
      Routers: state => state.routers,
      tableData: state => state.tableData
    },
    actions: {
      getMovielist ({ commit }) {
        commit('setMovielist', {})
      },
      getAnalysis ({ commit }) {
        commit('setAnalysis', {});
      },
      Copy ({ commit }) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', this.content)
        if (commit('judgeClient') === 'iOS') {
          input.setAttribute('readonly', 'readonly')
          input.setSelectionRange(0, -1)
        } else {
          input.select()
        }
        if (document.execCommand('copy')) {
          document.execCommand('copy')
        }
        document.body.removeChild(input)
      },
      GenerateRoutes ({ commit, state }) {
        const { roles } = state
        return new Promise((resolve, reject) => {
          try {
            commit(
              'setRouter',
              getRouter(routesList, roles)
            )
            resolve(state.routers)
          } catch (err) {
            reject(err)
          }
        })
      },
      async getClient ({ commit }, item = {}) {
        console.log(3333)
        return commit('getClient', item)
      },
      async addClient ({ commit }, item) {
        return commit('addClient', item)
      },
      async addBusiness({ commit }, item) {
        return commit('addBusiness', item)
      },
      async editClient ({ commit }, item) {
        return commit('editClient', item)
      },
      async deleteClient ({ commit }, item) {
        return commit('deleteClient', item)
      }
    }
  })
}
