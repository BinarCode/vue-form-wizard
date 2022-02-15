import { createApp } from 'vue'
const app = createApp({})

export {
  Wizard as FormWizard,
  ShapeType,
  LayoutType,
  StepSizeType
} from "./FormWizard"
export { Tab as TabContent } from "./TabContent"
export { Step as WizardStep } from "./WizardStep"

import { Wizard as FormWizard } from "./FormWizard"
import { Tab as TabContent } from "./TabContent"
import { Step as WizardStep } from "./WizardStep"

export default VueFormWizard {
  install: (app, options) => {
    FormWizard: FormWizard;
    TabContent: TabContent;
    WizardStep: WizardStep;
  }
}
