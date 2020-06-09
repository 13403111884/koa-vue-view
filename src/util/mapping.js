
export const arr = []

export default {
  install: Vue => {
    Vue.prototype.$arr = arr
  }
}
