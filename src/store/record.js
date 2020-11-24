import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord(ctx, record) {
      try {
        const uid = await ctx.dispatch('getUid')
        firebase.database().ref(`users/${uid}/records`).push(record)
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    }
  }
}