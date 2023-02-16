import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:{},
    gedanid:''
  },
  getters: {
  },
  mutations: {
    getUserInfo(state,user){
      state.userinfo=user
    },
    editGedanId (state,id) {
      state.gedanid=id
    }
  },
  actions: {
  },
  modules: {
  }
})
