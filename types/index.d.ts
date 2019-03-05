import Vue from 'vue'
import { PluginFunction } from "vue";

export function install (vue: typeof Vue): void

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

declare class VueFormWizard {
  static install: PluginFunction<never>;

  FormWizard: FormWizard;
  TabContent: TabContent;
  WizardStep: WizardStep;
}

export default VueFormWizard;
