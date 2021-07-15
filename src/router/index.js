import Vue from 'vue'
import Vuex from 'vuex'

import Router from 'vue-router'
const index = () => import('../view/index/index.vue')
const login = () => import('../view/login/login.vue')
const notice = () => import('../view/notice/notice.vue')
const info = () => import('../view/info/info.vue')
const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
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
