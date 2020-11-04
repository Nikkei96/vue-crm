import firebase from 'firebase/app'

export default {
  actions: {
    async login(ctx, payload) {
      try {
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      } catch (e) {
        throw e
      }
    }
  }
}