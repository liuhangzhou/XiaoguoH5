import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

let bus = new Vue()
Vue.prototype.bus = bus
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
