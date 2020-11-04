<template>
  <div id='app'>
    <component :is='layout'>
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
    EmptyLayout: () => import('@/layouts/EmptyLayout.vue'),
    MainLayout: () => import('@/layouts/MainLayout.vue'),
  },

  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty').capitalize() + 'Layout'
    },
  },
}
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
