import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory(ctx, { title, limit }) {
      try {
        const uid = await ctx.dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    }
  }
}