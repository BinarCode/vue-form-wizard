# WIP vue-tab-wizard
A dynamic tab wizard to split your forms easier

Vue-tab-wizard is a vue based component with **no external depenendcies** which simplifies tab wizard management and allows you to focus on the functional part of your app rather than
wasting time on details. Just forget about id's, external scripts and jQuery dependencies

# Demos
Basic [demo](https://jsfiddle.net/CristiJ/bt5dhqtf/80/)

Other demos:
* [Squared steps](https://jsfiddle.net/CristiJ/bt5dhqtf/62/)
* [Tabbed steps](https://jsfiddle.net/CristiJ/bt5dhqtf/63/)
* [Step index](https://jsfiddle.net/CristiJ/bt5dhqtf/79/) Start at any step. Note: start-index is zero-based and the count starts at 0
* [Custom button and title text](https://jsfiddle.net/CristiJ/bt5dhqtf/69/)
* [Custom title slot](https://jsfiddle.net/CristiJ/bt5dhqtf/74/)
* [Customized buttons with slots](https://jsfiddle.net/CristiJ/bt5dhqtf/76/) Replace stuff you don't like

# Usage
```vue
//global registration
import 'vue-tab-wizard'
import 'vue-tab-wizard/dist/vue-tab-wizard.min.css'
Vue.use(VueTabWizard)

//local registration
import {TabWizard, TabContent} from 'vue-tab-wizard'
import 'vue-tab-wizard/dist/vue-tab-wizard.min.css'
//component code
components: {
  TabWizard,
  TabContent
}

<tab-wizard>
  <tab-content title="Personal details">
    My first tab content
  </tab-content>
  <tab-content title="Additional Info">
      My second tab content
   </tab-content>
   <tab-content title="Last step">
     Yuhuuu! This seems pretty damn simple
   </tab-content>
</tab-wizard>
```

# Props
## Tab Wizard props
```js
props: {
  title: {
    type: String,
    default: 'Awesome Wizard'
  },
  subtitle: {
    type: String,
    default: 'Split a complicated flow in multiple steps'
  },
  nextButtonText: {
    type: String,
    default: 'Next'
  },
  backButtonText: {
    type: String,
    default: 'Back'
  },
  finishButtonText: {
    type: String,
    default: 'Finish'
  },
  /***
  * Applies to text, border and circle
  */
  color: {
    type: String,
    default: '#e74c3c' //circle, border and text color
  },
  /**
  * Can take one of the following values: 'circle|square|tab`
  */
  shape: {
    type: String,
    default: 'circle'
  },
  /**
  * name of the transition when transition between steps
  */
  transition: {
    type: String,
    default: '' //name of the transition when transition between steps
  },
  /***
  * Index of the initial tab to display
  */
  startIndex: {
    type: Number,
    default: 0
  }
}
```

## Tab content props
```js
props: {
  title: {
    type: String,
    default: ''
  },
  /***
   * Icon name for the upper circle corresponding to the tab
   * Supports themify icons only for now.
   */
  icon: {
    type: String,
    default: ''
  },
  /***
   * Function to execute before tab switch. Return value must be boolean
   * If the return result is false, tab switch is restricted
   */
  beforeChange: {
    type: Function
  }
}
```

# Slots
* **Default** - Used for tab-contents
* **title** - Upper title section including sub-title
* **prev** - Previous button content (no need to worry about handling the button functionality)
* **next** - Next button content
* **finish** - Finish button content
