<template>
  <div id='app'>
    <router-view />
    <button class='btn'>-</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},

  mounted() {
    console.log(process.env)
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
