import Vue from 'vue'
import Vuex from 'vuex'

import Router from 'vue-router'
const index = () => import('../view/index/index.vue')
const login = () => import('../view/login/login.vue')
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
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
