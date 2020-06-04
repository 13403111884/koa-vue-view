import state from './state'
import mutations from './mutations'

export default {
  namespaced: true,
  state,
  mutations,
  getters: {
    tableData: state => state.tableData
  },
  actions: {
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
}
