import Vue from 'vue'
import App from './App'

import router from './router'
Vue.router = router;

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import VueTagsInput from '@johmun/vue-tags-input'
Vue.use(VueTagsInput)

import axios from './axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueAuth from '@websanova/vue-auth'
import VueAuthBearer from '@websanova/vue-auth/drivers/auth/bearer.js'
import VueAuthAxios from '@websanova/vue-auth/drivers/http/axios.1.x.js'
import VueAuthRouter from '@websanova/vue-auth/drivers/router/vue-router.2.x.js'
Vue.use(VueAuth, {
    auth: VueAuthBearer,
    http: VueAuthAxios,
    router: VueAuthRouter
})

import api from "./api/subscription.api";
Vue.prototype.$api = api;


Vue.config.productionTip = false

import i18n from './i18n'
import store from './store'

import './registerServiceWorker'
import './assets/scss/app.scss'

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
