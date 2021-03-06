import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo(ctx, updInfo) {
      try {
        const uid = await ctx.dispatch('getUid')
        const updateData = { ...ctx.getters.info, ...updInfo }
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        ctx.commit('setInfo', updateData)
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    },

    async fetchInfo(ctx) {
      try {
        const uid = await ctx.dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        ctx.commit('setInfo', info)
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }

    }
  },
  getters: {
    info: s => s.info
  }
}