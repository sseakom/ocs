import Vue from 'vue'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store/index.js'
import router from './routers/index.js'
import './assets/css/base.css'

Vue.use(Vuex)
// Vue.use(VueResource)

const app = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
