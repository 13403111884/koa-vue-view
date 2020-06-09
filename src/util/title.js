function getTitle (vm) {
  if (vm.$route && vm.$route.meta) {
    const { title } = vm.$route.meta
    if (title) {
      return typeof title === 'function'
        ? title.call(vm)
        : title
    }
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = title
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}

const titleMixin = process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin

export default {
  install: Vue => {
    Vue.mixin(titleMixin)
  }
}
