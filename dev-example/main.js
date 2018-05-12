// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import FormWizard from '../src/index'
import WizardRoute from './WizardRoute.vue'
import FormGeneratorRoute from './FormGeneratorRoute.vue'
import TestRoute from './TestRoute.vue'

const First = {template: '<div>First page</div>'}
const Second = {template: '<div>Second page</div>'}
const Third = {template: '<div>Third page</div>'}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', component: WizardRoute,
      children: [
        {path: '/first', component: First},
        {path: '/second', component: Second},
        {path: '/third', component: Third}
      ]
    },
    {path: '/test', component: TestRoute},
    {path: '/form-generator', component: FormGeneratorRoute},

  ]
})
Vue.use(VueRouter)
Vue.use(FormWizard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
