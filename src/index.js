module.exports = {

  TabWizard: require('./components/TabWizard.vue'),
  TabContent: require('./components/TabContent.vue'),

  install (Vue) {
    Vue.component('tab-wizard', module.exports.TabWizard)
    Vue.component('tab-content', module.exports.TabContent)
  }
}
