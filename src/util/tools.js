import Moment from 'moment'

export function lookup (obj, replaceVal = '--', exec = '_') {
  return new Proxy({}, {
    get: (target, key) => {
      if (key === exec) {
        return obj || replaceVal
      } else {
        return lookup(!!obj && obj[key], replaceVal, exec)
      }
    }
  })
}
export function getTime (time, format) {
  return time ? Moment(time).format(format) : '--'
}
export const getDataTime = (time) => {
  return time ? Moment(time).valueOf() : '--'
}

export default {
  lookup,
  getTime
}