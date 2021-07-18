import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  role: 0,
  trueName: '',
  userName: '',
  id: '',
  schoolId: '',
  roomId: '',
  phoneNumber: '',
  checkTime: '',
  buildId: '',
  updateTime: '',
  deleteTime: ''
}
const mutations = {

}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [persistedState()]
})
