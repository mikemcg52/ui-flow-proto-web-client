import { createApp } from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'core-js'
import QuestionHub from '@/question-hub'
import AlertHub from '@/alert-hub'

// Setup axios as the Vue default $http library
axios.defaults.baseURL = 'https://localhost:7216' // same as the Url the server listens to

// use Vue 3 syntax
const app = createApp(App)
  .use(BootstrapVue3)
  .use(router)
  .use(QuestionHub)
  .use(AlertHub)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$questionHub = QuestionHub
app.config.globalProperties.$alertHub = AlertHub
app.mount('#app')
