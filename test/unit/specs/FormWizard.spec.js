import VueFormWizard, {TabContent as WizardTab, WizardStep, FormWizard} from './../../../src/index'
import {mount, createLocalVue} from 'vue-test-utils'
import sinon from 'sinon'
import Vue from 'vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueFormWizard)
localVue.use(VueRouter)

const First = {template: '<div>First page</div>'}
const Second = {template: '<div>Second page</div>'}
const Third = {template: '<div>Third page</div>'}

const router = new VueRouter({
  routes: [
    {path: '/first', component: First},
    {path: '/second', component: Second},
    {path: '/third', component: Third}
  ]
})


const startIndex = 0
let validationMethod = sinon.stub()
validationMethod.returns(true)
let secondValidationMethod = sinon.stub()
let initialWizard = {
  template: `<form-wizard :start-index="startIndex">
              <tab-content title="Personal details"
                           icon="ti-user">
                My first tab content
              </tab-content>
              <tab-content title="Additional Info"
                           v-if="showSecondStep" 
                           icon="ti-settings">
                My second tab content
              </tab-content>
              <tab-content title="Last step" v-if="showLastStep"
                           icon="ti-settings">
                My third tab content
              </tab-content>
          </form-wizard>`,
  data () {
    return {
      startIndex: startIndex,
      showLastStep: true,
      showSecondStep: true
    }
  }
}
let threeStepWizard = initialWizard

let routerWizard = {
  template: `<form-wizard>
                <tab-content title="Personal details"
                             route="/first"
                             icon="ti-user">
                </tab-content>
                <tab-content title="Additional Info"
                             route="/second"
                             icon="ti-settings">
                </tab-content>
                <tab-content title="Last step"
                             route="/third"
                             icon="ti-check">
                </tab-content>
                 <router-view></router-view>
              </form-wizard>`
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
    const wizard = mount(threeStepWizard, {localVue})
    wizard.hasClass('vue-form-wizard')
  })
  describe('renders', () => {
    it('steps', (done) => {
      const wizard = mount(threeStepWizard, {localVue})
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
    it('tabs', () => {
      const wizard = mount(threeStepWizard, {localVue})
      const tabs = wizard.findAll(WizardTab)
      expect(tabs.length).to.equal(3)
    })
    it('only one tab content', () => {
      const wizard = mount(threeStepWizard, {localVue})
      const tabs = wizard.findAll(WizardTab).wrappers
      const activeTabs = tabs.filter((tab) => tab.vm.active)
      const inactiveTabs = tabs.filter((tab) => !tab.vm.active)
      expect(activeTabs.length).to.equal(1)

      inactiveTabs.forEach((tab) => {
        expect(tab.hasStyle('display', 'none')).to.equal(true)
      })
    })
    it('slot wrapped in another tag', done => {
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
    it('less tabs when one tab is removed', (done) => {
      const wizard = mount(threeStepWizard, {localVue})
      const tabs = wizard.findAll(WizardTab)
      expect(tabs.length).to.equal(3)
      wizard.setData({showLastStep: false})
      Vue.nextTick(() => {
        const newTabs = wizard.findAll(WizardTab)
        expect(newTabs.length).to.equal(2)
        done()
      })
    })
    it('tabs in the same order when a tab before the active tab is removed', (done) => {
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      const tabs = wizard.findAll(WizardTab)
      expect(tabs.length).to.equal(3)
      // navigate to last step
      wizardInstance.vm.nextTab()
      wizardInstance.vm.nextTab()
      // remove second step
      wizard.setData({showSecondStep: false})
      Vue.nextTick(() => {
        const newTabs = wizard.findAll(WizardTab)
        expect(newTabs.length).to.equal(2)
        const lastTab = newTabs.at(1)
        expect(lastTab.vm.active).to.equal(true)
        expect(lastTab.vm.title).to.equal('Last step')
        done()
      })
    })
  })

  it('warns when start index is incorrect', () => {
    let originalConsole = window.console
    window.console = {warn: sinon.stub()}
    const wizard = mount(FormWizard, {localVue, slots: {default: divSlot}, propsData: {startIndex: 15}})
    expect(wizard.vm.activeTabIndex).to.not.equal(15)
    expect(window.console.warn.called).to.equal(true)
    window.console = originalConsole
  })

  it('resets wizard', () => {
    const wizard = mount(threeStepWizard, {localVue})
    const wizardInstance = wizard.find(FormWizard)
    let tabs = wizard.findAll(WizardTab)
    expect(tabs.length).to.equal(3)
    wizardInstance.vm.nextTab()
    wizardInstance.vm.nextTab()
    const lastTab = tabs.at(2)
    expect(lastTab.vm.active).to.equal(true)
    expect(wizardInstance.vm.maxStep).to.equal(tabs.length - 1)
    expect(wizardInstance.vm.activeTabIndex).to.equal(tabs.length - 1)
    wizardInstance.vm.reset()
    const firstTab = tabs.at(0)
    expect(firstTab.vm.active).to.equal(true)
    expect(wizardInstance.vm.maxStep).to.equal(0)
    expect(wizardInstance.vm.activeTabIndex).to.equal(0)
  })

  it('activates all steps', (done) => {
    const wizard = mount(threeStepWizard, {localVue})
    const wizardInstance = wizard.find(FormWizard)
    let tabs = wizard.findAll(WizardTab)
    let maxStepIndex = tabs.length - 1
    wizardInstance.vm.activateAll()

    Vue.nextTick(() => {
      expect(wizardInstance.vm.activeTabIndex).to.equal(0)
      expect(wizardInstance.vm.maxStep).to.equal(maxStepIndex)
      // direct navigation should be available
      wizardInstance.vm.navigateToTab(maxStepIndex)
      expect(wizardInstance.vm.activeTabIndex).to.equal(maxStepIndex)
      let steps = wizardInstance.findAll('.wizard-icon-circle')
      expect(steps.hasClass('checked')).to.equal(true)
      done()
    })
  })

  describe('navigation', () => {
    it('next tab is called', () => {
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      const nextButton = wizard.find('.wizard-footer-right span')
      nextButton.trigger('click')
      expect(wizardInstance.vm.activeTabIndex).to.equal(1)
    })

    it('prev tab is called', (done) => {
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      const nextButton = wizard.find('.wizard-footer-right span')
      nextButton.trigger('click')
      expect(wizardInstance.vm.activeTabIndex).to.equal(1)
      Vue.nextTick(() => {
        const backButton = wizardInstance.find('.wizard-footer-left span')
        backButton.trigger('click')
        expect(wizardInstance.vm.activeTabIndex).to.equal(0)
        done()
      })
    })
    it('is restricted to unvisted tabs by click', () => {
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.navigateToTab(1)
      expect(wizardInstance.vm.activeTabIndex).to.equal(0)
    })
    it('starts at a given index', () => {
      const wizard = mount(threeStepWizard, {localVue})
      const tabs = wizard.findAll(WizardTab)
      const activeTab = tabs.at(startIndex)
      expect(activeTab.vm.active).to.equal(true)
      const formWizard = wizard.find(FormWizard)
      expect(formWizard.vm.activeTabIndex).to.equal(startIndex)
    })

    it('navigates to a visited tab', () => {
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      let tabs = wizard.findAll(WizardTab)
      wizardInstance.vm.nextTab()
      wizardInstance.vm.nextTab()
      wizardInstance.vm.navigateToTab(0)
      const firstTab = tabs.at(0)
      expect(firstTab.vm.active).to.equal(true)
      expect(wizardInstance.vm.activeTabIndex).to.equal(0)
      expect(wizardInstance.vm.maxStep).to.equal(tabs.length - 1)

      wizardInstance.vm.navigateToTab(2)
      expect(wizardInstance.vm.activeTabIndex).to.equal(2)
      expect(wizardInstance.vm.maxStep).to.equal(tabs.length - 1)
    })

    it('active tab is prev when current active tab is removed', (done) => {
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      // navigate to last tab
      wizardInstance.vm.nextTab()
      wizardInstance.vm.nextTab()
      const tabs = wizard.findAll(WizardTab)
      expect(tabs.length).to.equal(3)
      wizard.setData({showLastStep: false})
      Vue.nextTick(() => {
        const newTabs = wizard.findAll(WizardTab)
        expect(newTabs.length).to.equal(2)
        expect(wizardInstance.vm.activeTabIndex).to.equal(1)
        done()
      })
    })

    it('with arrow keys on visited tabs', () => {
      const wizard = mount(threeStepWizard, {localVue, attachToDocument: true})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      wizardInstance.vm.nextTab()
      wizard.trigger('tab')
      wizard.trigger('keyup.right')
      wizard.trigger('keyup.left')
      expect(wizardInstance.vm.activeTabIndex).to.equal(2)
    })
  })

  describe('emits', () => {
    it('on-complete upon last step', () => {
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      const nextButton = wizard.find('.wizard-footer-right span')
      nextButton.trigger('click')
      nextButton.trigger('click')
      nextButton.trigger('click')
      expect(wizardInstance.vm.activeTabIndex).to.equal(2)
      expect(wizardInstance.emitted()['on-complete'].length).to.equal(1)
    })
  })
  describe('validation with', () => {
    beforeEach(() => {
      threeStepWizard = {
        template: `<form-wizard :validate-on-back="true">
              <tab-content title="Personal details"
                           
                           :before-change="validationMethod"
                           icon="ti-user">
                My first tab content
              </tab-content>
              <tab-content title="Additional Info"
                           :before-change="secondValidationMethod"
                           icon="ti-settings">
                My second tab content
              </tab-content>
              <tab-content title="Last step"
                           icon="ti-settings">
                My third tab content
              </tab-content>
          </form-wizard>`,
        methods: {
          validationMethod,
          secondValidationMethod
        }
      }
    })

    it('simple method', () => {
      threeStepWizard.methods.validationMethod = sinon.stub()
      threeStepWizard.methods.validationMethod.returns(true)
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      expect(threeStepWizard.methods.validationMethod.called).to.equal(true)
      expect(wizardInstance.vm.activeTabIndex).to.equal(1)
    })
    it('simple method on back navigation', () => {
      threeStepWizard.methods.secondValidationMethod = sinon.stub()
      threeStepWizard.methods.secondValidationMethod.returns(true)
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      wizardInstance.vm.prevTab()
      expect(threeStepWizard.methods.secondValidationMethod.called).to.equal(true)
    })
    it('falsy method', () => {
      threeStepWizard.methods.validationMethod = sinon.stub()
      threeStepWizard.methods.validationMethod.returns(false)
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      expect(threeStepWizard.methods.validationMethod.called).to.equal(true)
      expect(wizardInstance.vm.activeTabIndex).to.equal(0)
    })
    it('promise', (done) => {
      threeStepWizard.methods.validationMethod = sinon.stub()
      threeStepWizard.methods.validationMethod.returns(Promise.resolve(true))
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      expect(threeStepWizard.methods.validationMethod.called).to.equal(true)
      Vue.nextTick(() => {
        expect(wizardInstance.vm.activeTabIndex).to.equal(1)
        done()
      })
    })

    it('failing promise', (done) => {
      threeStepWizard.methods.validationMethod = sinon.stub()
      threeStepWizard.methods.validationMethod.returns(Promise.reject(false))
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      expect(threeStepWizard.methods.validationMethod.called).to.equal(true)
      Vue.nextTick(() => {
        expect(wizardInstance.vm.activeTabIndex).to.equal(0)
        done()
      })
    })
  })
  describe('after change', () => {
    beforeEach(() => {
      threeStepWizard = {
        template: `<form-wizard>
              <tab-content title="Personal details"
                           
                           :after-change="validationMethod"
                           icon="ti-user">
                My first tab content
              </tab-content>
              <tab-content title="Additional Info"
                           :after-change="validationMethod"
                           icon="ti-settings">
                My second tab content
              </tab-content>
              <tab-content title="Last step"
                           icon="ti-settings">
                My third tab content
              </tab-content>
          </form-wizard>`,
        methods: {
          validationMethod,
        }
      }
    })
    it('simple method on after change', () => {
      threeStepWizard.methods.validationMethod = sinon.stub()
      threeStepWizard.methods.validationMethod.returns(null)
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      expect(threeStepWizard.methods.validationMethod.should.have.been.called)
      expect(wizardInstance.vm.activeTabIndex).to.equal(1)
    })
    it('simple method on back navigation after change', () => {
      threeStepWizard.methods.validationMethod = sinon.stub()
      threeStepWizard.methods.validationMethod.returns(null)
      const wizard = mount(threeStepWizard, {localVue})
      const wizardInstance = wizard.find(FormWizard)
      wizardInstance.vm.nextTab()
      wizardInstance.vm.prevTab()
      expect(threeStepWizard.methods.validationMethod.should.have.been.called)
    }) 
  })
  describe('with vue-router', ()=> {
    it('renders correct tab contents', () => {
      const wizard = mount(routerWizard, {localVue, router})
      const wizardInstance = wizard.find(FormWizard)
      let tabs = wizardInstance.findAll(WizardTab)
      let firstTab  = tabs.at(0)
      expect(tabs.length).to.equal(3)
      expect(firstTab.vm.route).to.equal(wizardInstance.vm.$route.path)
    })

    it('adapts to valid route changes when steps are visited', (done) => {
      const wizard = mount(routerWizard, {localVue, router})
      const wizardInstance = wizard.find(FormWizard)
      let tabs = wizardInstance.findAll(WizardTab)
      wizardInstance.vm.activateAll()
      wizardInstance.vm.$router.push('/second')
      Vue.nextTick(()=> {
        let secondTab = tabs.at(1)
        expect(secondTab.vm.route).to.equal(wizardInstance.vm.$route.path)
        expect(secondTab.vm.active).to.equal(true)
        done()
      })


    })
  })
})
