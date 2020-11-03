// router

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})