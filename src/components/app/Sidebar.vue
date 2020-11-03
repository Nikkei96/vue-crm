<template>
  <ul class='sidenav app-sidenav' :class='{open: isOpen}'>
    <router-link
      v-for='(link, index) of links'
      :key='index'
      tag='li'
      active-class='active'
      :to='link.path'
      :exact='link.exact'
    >
      <a class='waves-effect waves-orange pointer'>{{ link.name }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    links: [
      { name: 'Счёт', path: '/', exact: true },
      { name: 'История', path: '/history' },
      { name: 'Планирование', path: '/planning' },
      { name: 'Новая запись', path: '/record' },
      { name: 'Категории', path: '/categories' },
    ],
  }),
}
</script>