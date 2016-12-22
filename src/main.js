// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Customers from './components/Customers.vue'
import About from './components/About.vue'
import Add from './components/Add.vue'
import Details from './components/CustomerDetails.vue'
import Edit from './components/Edit.vue'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/', component: Customers },
  { path: '/about', component: About },
  { path: '/add', component: Add },
  { path: '/customer/:id', component: Details },
  { path: '/customer/edit/:id', component: Edit },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: __dirname
})

const app = new Vue({
  router: router
}).$mount('#app')
