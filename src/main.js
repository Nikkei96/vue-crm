import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import dateFilter from './filters/date.filter'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

Vue.filter('dateFilter', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
