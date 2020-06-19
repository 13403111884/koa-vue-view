import Moment from 'moment'
import Tools from '@stroll/tools'

export function getTime (time, format) {
  return time ? Moment(time).format(format) : '--'
}
export const getDataTime = (time) => {
  return time ? Moment(time).valueOf() : '--'
}

export default {
  install: Vue => {
    Vue.prototype.$tools = Tools
    Vue.prototype.$getTime = getTime
    Vue.prototype.$getDataTime = getDataTime
  }
}
