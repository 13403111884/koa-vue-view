export default {
  setUserlist: (state, list) => {
    state.userList = list
  },
  setMovielist: (state, list) => {
    state.movieList = list
  },
  setAnalysis: (state, list) => {
    state.analysisList = list
  },
  judgeClient: () => {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return 'iOS'
    } else if (/(Android)/i.test(navigator.userAgent)) {
      return 'Android'
    } else {
      return 'PC'
    }
  },
  setRouter: (state, routers) => {
    if (!routers) return
    state.routers = state.defaultRoute.concat(routers)
  }
}