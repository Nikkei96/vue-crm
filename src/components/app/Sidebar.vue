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
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    links: [
      { name: localizeFilter('Menu_Bill'), path: '/', exact: true },
      { name: localizeFilter('Menu_History'), path: '/history' },
      { name: localizeFilter('Menu_Planning'), path: '/planning' },
      { name: localizeFilter('Menu_NewRecord'), path: '/record' },
      { name: localizeFilter('Menu_Categories'), path: '/categories' },
    ],
  }),
}
</script>