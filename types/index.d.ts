import Vue from 'vue'
import { PluginFunction } from "vue";

export function install (vue: typeof Vue): void

import { Wizard } from './FormWizard'
import { Tab } from './TabContent'
import { Step } from './WizardStep'

export class FormWizard extends Wizard {}
export class TabContent extends Tab {}
export class WizardStep extends Step {}

declare class VueFormWizard {
  static install: PluginFunction<never>;

  FormWizard: FormWizard;
  TabContent: TabContent;
  WizardStep: WizardStep;
}

export default VueFormWizard;
