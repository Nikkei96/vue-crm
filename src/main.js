import Vue from 'vue'
// библиотека для валидации форм
import Vuelidate from 'vuelidate'
//meta
import VueMeta from 'vue-meta'
// пагинация
import Paginate from 'vuejs-paginate'
// главная точка входа, куда будет маунтиться все данные vue
import App from './App.vue'
// класс new Router(), который инициализирован с массивом путей (routes) и хистори модом
import router from './router'
// класс new Vuex.Store() - хранилище из папки store (в ней index.js, поэтому можем не писать название файла)
import store from './store'
// кастомная директива для тултипа
import tooltipDirective from './directives/tooltip.directive'
// собственный фильтр для даты
import dateFilter from './filters/date.filter'
// собственный фильтр для валюты
import currencyFilter from './filters/currency.filter'
// фильтр локализации
import localizeFilter from './filters/localize.filter'
// собственный плагин для сообщений через M.toast()
import messagePlugin from './plugins/message.plugin'
// собственный плагин для тайтлов страницы (во вкладке браузера)
import titlePlugin from './plugins/title.plugin'
// Компонент лоадера
import Loader from './components/app/Loader'
// минифицированнный js-файл materialize
import 'materialize-css/dist/js/materialize.min.js'
// firebase from google
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

// глобальная регистрация фильтра
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('localizeFilter', localizeFilter)

// используем во Vue
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)

// регистрация директивы
Vue.directive('tooltip', tooltipDirective)

// регистрация компоненты
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

// инициализация БД
const firebaseConfig = {
  apiKey: "AIzaSyAGBx8JHzs2ez6AFQCZPzYeI8bVGzIF6zo",
  authDomain: "vue-crm-777.firebaseapp.com",
  databaseURL: "https://vue-crm-777.firebaseio.com",
  projectId: "vue-crm-777",
  storageBucket: "vue-crm-777.appspot.com",
  messagingSenderId: "821781190051",
  appId: "1:821781190051:web:488b9f7ac15d8b436e3616"
}
firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})


