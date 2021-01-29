import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// 使用i18n
const lang_zh = zh	//获取默认中文
const lang_en = en	//获取默认英文
const messages = {
	en: lang_en,
	zh: lang_zh
}
const locale = navigator.language === 'en' ? 'en' : 'zh'
const i18n = new VueI18n({
  locale, // set locale
  messages, // set locale messages
})

let bus = new Vue()
Vue.prototype.bus = bus
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
