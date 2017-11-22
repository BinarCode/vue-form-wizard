import VueFormWizard, {TabContent as WizardTab, WizardStep, FormWizard} from './../../../src/index'
import {mount, createLocalVue} from 'vue-test-utils'
import sinon from 'sinon'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(VueFormWizard)
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

const divSlot = `<div>
                    <tab-content title="Personal details"
                                 icon="ti-user">
                      First
                    </tab-content>
                    <tab-content title="Additional Info"
                                 icon="ti-settings">
                      Second
                    </tab-content>
                    <tab-content title="Last step"
                                 icon="ti-settings">
                      Third
                    </tab-content>
                  </div>`

describe('FormWizard.vue', () => {
  it('contains wizard class', () => {
    const wizard = mount(twoStepWizard, {localVue})
    wizard.hasClass('vue-form-wizard')
  })
  it('renders steps', (done) => {
    const wizard = mount(twoStepWizard, {localVue})
    Vue.nextTick(() => {
      const steps = wizard.findAll(WizardStep)
      const firsStep = steps.at(0)
      expect(steps.length).to.equal(3)
      expect(firsStep.hasClass('active'))
      const stepTitle = firsStep.find('.stepTitle')
      expect(stepTitle.is('span')).to.equal(true)
      const stepText = stepTitle.text().trim()
      expect(stepText).to.equal('Personal details')
      done()
    })
  })
  it('renders tabs', () => {
    const wizard = mount(twoStepWizard, {localVue})
    const tabs = wizard.findAll(WizardTab)
    expect(tabs.length).to.equal(3)
  })
  it('displays only one tab', () => {
    const wizard = mount(twoStepWizard, {localVue})
    const tabs = wizard.findAll(WizardTab).wrappers
    const activeTabs = tabs.filter((tab) => tab.vm.active)
    const inactiveTabs = tabs.filter((tab) => !tab.vm.active)
    expect(activeTabs.length).to.equal(1)

    inactiveTabs.forEach((tab) => {
      expect(tab.hasStyle('display', 'none')).to.equal(true)
    })
  })
  it('starts at a given index', () => {
    const wizard = mount(twoStepWizard, {localVue})
    const tabs = wizard.findAll(WizardTab)
    const activeTab = tabs.at(startIndex)
    expect(activeTab.vm.active).to.equal(true)
    const formWizard = wizard.find(FormWizard)
    expect(formWizard.vm.activeTabIndex).to.equal(startIndex)
  })
  it('next tab is called', () => {
    const wizard = mount(twoStepWizard, {localVue})
    const nextTabHandler = sinon.stub()
    const formWizard = wizard.find(FormWizard)
    formWizard.setMethods({nextTab: nextTabHandler})
    const nextButton = wizard.find('.wizard-footer-right span')
    nextButton.trigger('click')
    expect(nextTabHandler.called).to.equal(true)
  })

  it('renders tab wrapped in another element', done => {
    const wizard = mount(FormWizard, {
      localVue,
      slots: {
        default: divSlot
      }
    })
    Vue.nextTick(() => {
      const tabs = wizard.findAll(WizardTab)
      expect(tabs.length).to.equal(3)
      done()
    })
  })
})
