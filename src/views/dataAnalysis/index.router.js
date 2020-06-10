export default [
  {
    path: '/dataAnalysis',
    name: 'dataAnalysis',
    meta: { title: '图表', icon: 'md-analytics', roles: [] },
    component: () => import(/* webpackChunkName: "index" */ './index.vue')
  }
]
