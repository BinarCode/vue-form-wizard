import Vue from 'vue'
import VueFormWizard from './../../../src/components/FormWizard.vue'
import TabContent from './../../../src/components/TabContent.vue'

function init () {
  Vue.component('form-wizard', VueFormWizard)
  Vue.component('tab-content', TabContent)
}

describe('FormWizard.vue', () => {
  beforeEach(() => {
    init()
  })
  it('should render correct contents', (done) => {
    const vm = new Vue({
      template: `<form-wizard ref="wizard">
                   <tab-content>First</tab-content> 
                   <tab-content>Second</tab-content> 
                </form-wizard>`
    }).$mount()

    let wizard = vm.$children[0]
    let wizardComp = vm.$refs.wizard
    expect(wizard.$children.length).to.equal(2)
    expect(wizardComp.activeTabIndex).to.equal(0)
    done()
  })
})
