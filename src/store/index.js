import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// экспортируем класс с основными свойствами и модулями
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {},

  strict: process.env.NODE_ENV !== 'production'
})