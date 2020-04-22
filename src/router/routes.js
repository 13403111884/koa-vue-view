const Home = () => import(/* webpackChunkName: "index" */ './../components')

export default [
  {
    path: '/',
    name: '',
    component: Home,
    redirect: { name: 'dataAnalysis' },
    meta: { title: '', icon: 'md-analytics', roles: [] },
    children: [
      {
        path: 'dataAnalysis',
        name: 'dataAnalysis',
        meta: { title: '图表', icon: 'md-analytics', roles: [] },
        component: () => import(/* webpackChunkName: "index" */ './../views/dataAnalysis')
      }
    ]
  },
  {
    path: '/manage',
    name: 'manage',
    component: Home,
    redirect: { name: 'userManage' },
    meta: { title: '表格', icon: 'md-appstore', roles: [] },
    children: [
      {
        path: 'userManage',
        name: 'userManage',
        meta: { title: 'user表格', icon: 'md-apps', roles: [] },
        component: () => import(/* webpackChunkName: "Manage" */ './../views/userManage')
      },
      {
        path: 'sumUp',
        name: 'sumUp',
        meta: { title: '总结', icon: 'ios-archive', roles: [] },
        component: () => import(/* webpackChunkName: "Manage" */ './../views/sumUp')
      }
    ]
  }
]
