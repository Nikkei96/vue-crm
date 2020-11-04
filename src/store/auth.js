import firebase from 'firebase/app'

export default {
  actions: {
    async login(ctx, payload) {
      try {
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    },
    async register(ctx, payload) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        const uid = await ctx.dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: payload.name,
        })
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    },
    getUid(ctx) {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout() {
      await firebase.auth().signOut()
    },
  }
}