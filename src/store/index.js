import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

// экспортируем класс с основными свойствами и модулями
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    auth
  },

  strict: process.env.NODE_ENV !== 'production'
})