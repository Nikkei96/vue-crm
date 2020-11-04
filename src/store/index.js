import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

// экспортируем класс с основными свойствами и модулями
export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: state => state.error
  },

  modules: {
    auth
  },

  strict: process.env.NODE_ENV !== 'production'
})