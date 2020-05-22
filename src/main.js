import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import { store } from './store/store'

import NProgress from 'nprogress'
import '../node_modules/nprogress/nprogress.css'

const token = localStorage.getItem('token')
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.get['Accepts'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeResolve((to, from, next)=>{
    if(to){
     NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
