export default [
  {
    path: '/userManage',
    name: 'userManage',
    meta: { title: 'user表格', icon: 'md-apps', roles: [] },
    component: () => import(/* webpackChunkName: "Manage" */ './index.vue')
  }
]
