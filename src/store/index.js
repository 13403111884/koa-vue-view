import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    namespaced: true,
    state,
    mutations,
    getters: {
      movieList: state => state.movieList,
      analysisList: state => state.analysisList,
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
