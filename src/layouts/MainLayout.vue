<template>
  <div class='app-main-layout'>
    <Navbar @toggleBar='isOpen = !isOpen' />
    <Sidebar :isOpen='isOpen' />

    <main class='app-content' :class='{full : !isOpen}'>
      <div class='app-page'>
        <router-view />
      </div>
    </main>

    <div class='fixed-action-btn'>
      <router-link class='btn-floating btn-large blue' to='/record'>
        <i class='large material-icons'>add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-layout',
  components: {
    Navbar: () => import('@/components/app/Navbar'),
    Sidebar: () => import('@/components/app/Sidebar'),
  },

  data: () => ({
    isOpen: true,
  }),
}
</script>