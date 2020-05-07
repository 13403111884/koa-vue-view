import API from '@api'
export default {
  getClient: (state, { params = null, current = null }) => {
    if (current) {
      state.tableData.page.current = current
    }
    return API('get', `${state.apiNameV1}/read`, {
      params,
      ...state.tableData.page
    }).then(res => {
      state.tableData.list = res.data.rows
      state.tableData.total = res.data.count
      return res.data.rows
    })
  },
  addClient: (state, { params = {} }) => {
    return API('post', `${state.apiNameV1}/addClient`, params).then(res => {
      return res.data
    })
  },
  addBusiness: (state, { params = {} }) => {
    return API('post', `/business/v1/addBusiness`, params).then(res => {
      return res.data
    })
  },
  editClient: (state, { params = {} }) => {
    return API('put', `${state.apiNameV1}/edit`, params).then(res => {
      return res.data
    })
  },
  deleteClient: (state, { query = {} }) => {
    return API('delete', `${state.apiNameV1}/delete/${query.id}`, {}).then(res => {
      return res.data
    })
  }
}
