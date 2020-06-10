let RouterArr = []
const Routers = require.context('./../views/', true, /\.router\.js$/)
Routers.keys().forEach(key => {
  RouterArr = RouterArr.concat(Routers(key).default)
})
export default [
  {
    path: '/',
    redirect: { name: 'dataAnalysis' },
    meta: { title: '', icon: 'md-analytics', roles: [] },
  },
  ...RouterArr
  // {
  //   path: '/sumUp',
  //   name: 'sumUp',
  //   meta: { title: '总结', icon: 'ios-archive', roles: [] },
  //   component: () => import(/* webpackChunkName: "Manage" */ './../views/sumUp')
  // }
]
