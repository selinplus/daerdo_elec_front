import Vue from 'vue'
import Vuex from 'vuex'
import db from './utils/localstorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: db.get('token'),
    username: db.get('username')
  },
  mutations: {
    setToken(state, val) {
      db.save('token', val)
      state.token = val
    },
    setUsername(state, val) {
      db.save('username', val)
      state.username = val
    },
    getUsername(state) {
      return state.username
    }
  },
  actions: {

  }
})
