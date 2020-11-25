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
    },

    async fetchRecords(ctx) {
      try {
        const uid = await ctx.dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    },

    async fetchRecordById(ctx, id) {
      try {
        const uid = await ctx.dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return { ...record, id }
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    }
  }
}