<template>
  <div id='app'>
    <router-view :is='layout' />
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
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },

  mounted() {
    // console.log(process.env)
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
