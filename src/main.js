import Vue from 'vue'
// библиотека для валидации форм
import Vuelidate from 'vuelidate'
// главная точка входа, куда будет маунтиться все данные vue
import App from './App.vue'
// класс new Router(), который инициализирован с массивом путей (routes) и хистори модом
import router from './router'
// класс new Vuex.Store() - хранилище из папки store (в ней index.js, поэтому можем не писать название файла)
import store from './store'
// собственный фильтр для даты
import dateFilter from './filters/date.filter'
// собственный плагин для сообщений через M.toast()
import messagePlugin from './plugins/message.plugin'
// минифицированнный js-файл materialize
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

// глобальная регистрация фильтра
Vue.filter('dateFilter', dateFilter)

// используем во Vue
Vue.use(Vuelidate)
Vue.use(messagePlugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
