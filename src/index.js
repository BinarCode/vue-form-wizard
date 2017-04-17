module.exports = {

  FormWizard: require('./components/FormWizard.vue'),
  TabContent: require('./components/TabContent.vue'),

  install (Vue) {
    Vue.component('form-wizard', module.exports.FormWizard)
    Vue.component('tab-content', module.exports.TabContent)
  }
}
