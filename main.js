import Vue from 'vue'
import App from './App'
import store from './store/websocket.js'
Vue.prototype.$store = store

import tobar from './pages/component/tobar.vue'
Vue.component('tobar',tobar)
import loading from './pages/component/loading.vue'
Vue.component('loading',loading)
import custom from './pages/component/custom.vue'
Vue.component('custom',custom)
import toast from './pages/component/toast.vue'
Vue.component('toast',toast)


import request from '@/utils/request.js'
Vue.prototype.$http = new request.Req();

import validate from '@/utils/validate.js'
Vue.prototype.$validate = validate;

import util from '@/utils/util.js'
Vue.prototype.$util = util;

import md5x from '@/utils/md5x.js'
Vue.prototype.$md5x = md5x;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()

 



