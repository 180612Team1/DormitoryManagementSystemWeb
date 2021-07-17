import Vue from 'vue'
import Vuex from 'vuex'

import Router from 'vue-router'
const index = () => import('../view/index/index.vue')
const login = () => import('../view/login/login.vue')
const notice = () => import('../view/notice/notice.vue')
const info = () => import('../view/info/info.vue')
const repairApply = () => import('../view/repairApply/repairApply.vue')
const studentManage = () => import('../view/studentManage/studentManage.vue')
const houseparentManage = () => import('../view/houseparentManage/houseparentManage.vue')
const repairRecord = () => import('../view/repairRecord/repairRecord.vue')
const buildManage = () => import('../view/buildManage/buildManage.vue')
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Vuex)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/notice',
          name: 'notice',
          component: notice
        },
        {
          path: '/info',
          name: 'info',
          component: info
        },
        {
          path: '/repairApply',
          name: 'repairApply',
          component: repairApply
        },
        {
          path: '/studentManage',
          name: 'studentManage',
          component: studentManage
        },
        {
          path: '/repairRecord',
          name: 'repairRecord',
          component: repairRecord
        },
        {
          path: '/houseparentManage',
          name: 'houseparentManage',
          component: houseparentManage
        },
        {
          path: '/buildManage',
          name: 'buildManage',
          component: buildManage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
