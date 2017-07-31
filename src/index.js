import FormWizard from './components/FormWizard.vue'
import TabContent from './components/TabContent.vue'
import WizardButton from './components/WizardButton.vue'
import WizardStep from './components/WizardStep.vue'
const VueFormWizard = {
  install (Vue) {
    Vue.component('form-wizard', FormWizard)
    Vue.component('tab-content', TabContent)
    Vue.component('wizard-button', WizardButton)
    Vue.component('wizard-step', WizardStep)
  }
}
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueFormWizard)
}

export default VueFormWizard
export {
  FormWizard,
  TabContent,
  WizardButton,
  WizardStep
}
