import Vue from 'vue'
import VueFormWizard from './../../../src/index'
import {TabContent as WizardTab, WizardStep, FormWizard} from './../../../src/index'
import {mount} from 'avoriaz'
import sinon from 'sinon'

Vue.use(VueFormWizard)
const startIndex = 0
const twoStepWizard = {
  template: `<form-wizard :start-index="startIndex">
              <tab-content title="Personal details"
                           icon="ti-user">
                My first tab content
              </tab-content>
              <tab-content title="Additional Info"
                           icon="ti-settings">
                My second tab content
              </tab-content>
              <tab-content title="Last step"
                           icon="ti-settings">
                My third tab content
              </tab-content>
          </form-wizard>`,
  data () {
    return {
      startIndex: startIndex
    }
  }
}
describe('FormWizard.vue', () => {
  it('contains wizard class', () => {
    const wizard = mount(twoStepWizard)
    wizard.hasClass('vue-form-wizard')
  })
  it('renders steps', (done) => {
    const wizard = mount(twoStepWizard)
    Vue.nextTick(() => {
      const steps = wizard.find(WizardStep)
      const firsStep = steps[0]
      expect(steps.length).to.equal(3)
      expect(firsStep.hasClass('active'))
      const stepTitle = firsStep.find('.stepTitle')[0]
      expect(stepTitle.is('span')).to.equal(true)
      const stepText = stepTitle.text().trim()
      expect(stepText).to.equal('Personal details')
      done()
    })
  })
  it('renders tabs', (done) => {
    const wizard = mount(twoStepWizard)
    Vue.nextTick(() => {
      const tabs = wizard.find(WizardTab)
      expect(tabs.length).to.equal(3)
      done()
    })
  })
  it('displays only one tab', (done) => {
    const wizard = mount(twoStepWizard)
    Vue.nextTick(() => {
      const tabs = wizard.find(WizardTab)
      const activeTabs = tabs.filter((tab) => tab.data().active)
      const inactiveTabs = tabs.filter((tab) => !tab.data().active)
      expect(activeTabs.length).to.equal(1)

      inactiveTabs.forEach((tab) => {
        expect(tab.hasStyle('display', 'none')).to.equal(true)
      })
      done()
    })
  })
  it('starts at a given index', (done) => {
    const wizard = mount(twoStepWizard)
    Vue.nextTick(() => {
      const tabs = wizard.find(WizardTab)
      const activeTab = tabs[startIndex]
      expect(activeTab.data().active).to.equal(true)
      const formWizard = wizard.find(FormWizard)[0]
      expect(formWizard.data().activeTabIndex).to.equal(startIndex)
      done()
    })
  })
  it('next tab is called', (done) => {
    const wizard = mount(twoStepWizard)
    const nextTabHandler = sinon.stub()
    const formWizard = wizard.find(FormWizard)[0]
    formWizard.setMethods({nextTab: nextTabHandler})
    Vue.nextTick(() => {
      const nextButton = wizard.find('.wizard-footer-right span')[0]
      nextButton.trigger('click')
      expect(nextTabHandler.called).to.equal(true)
      done()
    })
  })

})
