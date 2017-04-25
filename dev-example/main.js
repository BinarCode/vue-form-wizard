// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import FormWizard from '../src/index'
const First = { template: '<div>Required checkbox: <input checked type="checkbox" id="firstcb"></div>' }
const Second = { template: '<div>Second page</div>' }
const Third = { template: '<div>Third page</div>' }

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/first', component: First },
    { path: '/second', component: Second },
    { path: '/third', component: Third }
  ]
})
Vue.use(VueRouter)
Vue.use(FormWizard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
})
