import { createApp } from 'vue'

const app = createApp({})

import FormWizard from './components/FormWizard.vue'
import TabContent from './components/TabContent.vue'
import WizardButton from './components/WizardButton.vue'
import WizardStep from './components/WizardStep.vue'
const VueFormWizard = {
  install (app) {
    app.component('form-wizard', FormWizard)
    app.component('tab-content', TabContent)
    app.component('wizard-button', WizardButton)
    app.component('wizard-step', WizardStep)
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
