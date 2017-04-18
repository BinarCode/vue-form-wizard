import Vue from 'vue'
import App from './App.vue'
import FormWizard from './../src/index'
Vue.use(FormWizard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
