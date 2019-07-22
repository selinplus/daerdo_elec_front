import Vue from 'vue'
import Vuex from 'vuex'
import db from './utils/localstorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: db.get('token'),
  },
  mutations: {
    setToken(state, val) {
      db.save('token', val)
      state.token = val
    }
  },
  actions: {

  }
})
