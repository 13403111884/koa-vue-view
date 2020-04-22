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
export const getTime = (time, format) => {
  return time ? Moment(time).format(format) : '--'
}

export default {
  lookup,
  getTime
}