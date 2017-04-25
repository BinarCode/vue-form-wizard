# vue-form-wizard
A dynamic form wizard to split your forms easier

Vue-form-wizard is a vue based component with **no external depenendcies** which simplifies tab wizard management and allows you to focus on the functional part of your app rather than
wasting time on details. Just forget about id's, external scripts and jQuery dependencies

# Demos
Basic [demo](https://jsfiddle.net/bt5dhqtf/97/)

Other demos:
* [Squared steps](https://jsfiddle.net/bt5dhqtf/98/)
* [Tabbed steps](https://jsfiddle.net/bt5dhqtf/99/)
* [Step index](https://jsfiddle.net/bt5dhqtf/100/) Start at any step. Note: start-index is zero-based and the count starts at 0
* [Custom button and title text](https://jsfiddle.net/bt5dhqtf/101/)
* [Custom title slot](https://jsfiddle.net/bt5dhqtf/102/)
* [Customized buttons with slots](https://jsfiddle.net/bt5dhqtf/103/) Replace stuff you don't like
* [Call a function before tab switch](https://jsfiddle.net/bt5dhqtf/105/)
* [Vue router integration](https://jsfiddle.net/bt5dhqtf/267/) You can place a `router-view` inside the wizard and have a separate page per tab. A `route` prop must be passed to the tabs you want to handle certain tabs
* [Async validation](https://jsfiddle.net/bt5dhqtf/272/) `before-change` prop can accept a promise that is resolved with `true` which will execute the promise before switching to another step/tab (NOTE: This feature is not present in the npm package yet)

# Usage

## NPM
`npm install vue-form-wizard`

## Or alternatively directly include the javascript
Download the css and js files from `dist` folder or reference them directly from github (check jsfiddle links)
```html
<link rel="stylesheet" href="vue-form-wizard.min.css">
<script src="vue-form-wizard.js"></script>
```
## Component registration
```js
//global registration
import 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueTabWizard)

//local registration
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-formwizard/dist/vue-form-wizard.min.css'
//component code
components: {
  FormWizard,
  TabContent
}
```
## Template usage

```html
<form-wizard>
  <tab-content title="Personal details">
    My first tab content
  </tab-content>
  <tab-content title="Additional Info">
      My second tab content
   </tab-content>
   <tab-content title="Last step">
     Yuhuuu! This seems pretty damn simple
   </tab-content>
</form-wizard>
```

# Props
## Form Wizard props
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
## Events
Vue-form-wizard emits certain events when certain actions happen inside the component. The events can be noticed in some of the demos and especially in the [async validation demo](https://jsfiddle.net/bt5dhqtf/272/)
* **on-complete** Called when the finish button is clicked and the `before-change` for the last step (if present) was executed. No params are sent together with this event. `this.$emit('on-complete')`
* **on-loading** Called whenever an async `before-change` is executed. This event is emitted before executing `before-change` and after finishing execution of `before-change` method. `on-loading` is emitted together with a Boolean value. `this.$emit('on-loading', value)`
* **on-validate** Called whenever the execution of a `before-change` method is completed. The event sends along a Boolean which represents the validation result as well as an int with te tab index. `this.$emit('on-validate', validationResult, this.activeTabIndex)`

# Slots
* **Default** - Used for tab-contents
* **title** - Upper title section including sub-title
* **prev** - Previous button content (no need to worry about handling the button functionality)
* **next** - Next button content
* **finish** - Finish button content
