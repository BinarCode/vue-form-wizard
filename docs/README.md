A dynamic form wizard to split your forms easier

Vue-form-wizard is a vue based component with **no external depenendcies** which simplifies tab wizard management and allows you to focus on the functional part of your app rather than
wasting time on details. Just forget about id's, external scripts and jQuery dependencies


# Usage

## NPM
`npm install vue-form-wizard`

## Direct script include
Download the css and js files from `dist` folder or reference them directly from github (check jsfiddle links)
```html
<link rel="stylesheet" href="https://unpkg.com/vue-form-wizard/dist/vue-form-wizard.min.css">
<script src="https://unpkg.com/vue-form-wizard/dist/vue-form-wizard.js"></script>
```
## Component registration
```js
//global registration
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

//local registration
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
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
* [Complete form example](https://jsfiddle.net/CristiJ/bt5dhqtf/286/) integrated with [vue-form-generator](https://github.com/icebob/vue-form-generator)
* [Element UI form integration](https://jsfiddle.net/bt5dhqtf/409/)
* [Vue router integration](https://jsfiddle.net/bt5dhqtf/267/) You can place a `router-view` inside the wizard and have a separate page per tab. A `route` prop must be passed to the tabs you want to handle certain tabs
* [Async validation with error message](https://jsfiddle.net/CristiJ/bt5dhqtf/298/) `before-change` prop can accept a promise that is resolved with `true` which will execute the promise before switching to another step/tab (NOTE: This feature is not present in the npm package yet)

# Playground

## Simple
<vuep template="#simpledemo"></vuep>

<script v-pre type="text/x-template" id="simpledemo">
<template>
  <form-wizard @on-complete="onComplete">
     <tab-content title="Personal details"
                  icon="ti-user">
       My first tab content
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
 </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       }
      }
  }
</script>
</script>


## Square steps

<vuep template="#squaredsteps"></vuep>

<script v-pre type="text/x-template" id="squaredsteps">
<template>
  <form-wizard @on-complete="onComplete" 
                        shape="square"
                        color="#3498db">
      <tab-content title="Personal details"
                   icon="ti-user">
        My first tab content
      </tab-content>
      <tab-content title="Additional Info"
                   icon="ti-settings">
        My second tab content
      </tab-content>
      <tab-content title="Last step"
                   icon="ti-check">
        Yuhuuu! This seems pretty damn simple
      </tab-content>
  </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       }
      }
  }
</script>
</script>


## Tabbed steps

<vuep template="#tabbedsteps"></vuep>

<script v-pre type="text/x-template" id="tabbedsteps">
<template>
  <form-wizard @on-complete="onComplete" 
                        shape="tab"
                        color="#9b59b6">
        <tab-content title="Personal details"
                     icon="ti-user">
          My first tab content
        </tab-content>
        <tab-content title="Additional Info"
                     icon="ti-settings">
          My second tab content
        </tab-content>
        <tab-content title="Last step"
                     icon="ti-check">
          Yuhuuu! This seems pretty damn simple
        </tab-content>
   </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       }
      }
  }
</script>
</script>


## Start from a specific index

<vuep template="#startindex"></vuep>

<script v-pre type="text/x-template" id="startindex">
<template>
 <form-wizard @on-complete="onComplete"
                       :start-index="1"
                       color="#e67e22">
     <tab-content title="Personal details"
                  icon="ti-user">
       My first tab content
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
 </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       }
      }
  }
</script>
</script>


## Custom button and title text

<vuep template="#customtext"></vuep>

<script v-pre type="text/x-template" id="customtext">
<template>
 <form-wizard @on-complete="onComplete"
                       title="This is a new title"
                       subtitle="And a new subtitle"
                       shape="tab"
                       back-button-text="Go back!"
                       next-button-text="Go next!"
                       finish-button-text="We're there"
                       color="#9b59b6">
     <tab-content title="Personal details"
                  icon="ti-user">
       My first tab content
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
 </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       }
      }
  }
</script>
</script>

## Replace buttons and title with Slots

<vuep template="#customslots"></vuep>

<script v-pre type="text/x-template" id="customslots">
<template>
 <form-wizard @on-complete="onComplete"
                       shape="tab"
                       color="#e67e22">
     <h2 slot="title">This will replace my whole title</h2> 
     <tab-content title="Personal details"
                  icon="ti-user">
       My first tab content
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
     
     <button slot="prev">Back</button>
     <button slot="next">Next</button>
     <button slot="finish">Finish</button>
 </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       }
      }
  }
</script>
</script>

## Call a function before tab switch

<vuep template="#callfunction"></vuep>

<script v-pre type="text/x-template" id="callfunction">
<template>
  <form-wizard @on-complete="onComplete" 
                       shape="tab"
                       color="#9b59b6">
     <tab-content title="Personal details"
                  icon="ti-user" :before-change="beforeTabSwitch">
       My first tab content
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
 </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
       },
       beforeTabSwitch: function(){
          alert("This is called before switchind tabs")
          return true;
        }
      },
  }
</script>
</script>

## Async validation

<vuep template="#asyncvalidation"></vuep>

<script v-pre type="text/x-template" id="asyncvalidation">
<template>
  <form-wizard @on-complete="onComplete"
                  @on-loading="setLoading"
                  @on-validate="handleValidation"
                  @on-error="handleErrorMessage"
                  shape="circle"
                  color="gray"
                  error-color="#e74c3c">
    <tab-content title="Personal details"
                 :before-change="validateAsync"
                 icon="ti-user">
            First tab
    </tab-content>
    <tab-content title="Additional Info"
                 icon="ti-settings">
            Second tab
    </tab-content>
    <tab-content title="Last step"
                 icon="ti-check">
            Third tab
    </tab-content>
    
    <div class="loader" v-if="loadingWizard"></div>
    <div v-if="errorMsg">
      <span class="error">{{errorMsg}}</span>
    </div>
  </form-wizard>
 
</template>
<style>
span.error{
  color:#e74c3c;
  font-size:20px;
  display:flex;
  justify-content:center;
}
</style>
<script>
  Vue.use(VueFormWizard)
  export default {
     data(){
        return {
         loadingWizard: false,
         errorMsg: null,
         count: 0
        }
      },
      methods: {
       onComplete: function(){
           alert('Yay. Done!');
        },
        setLoading: function(value) {
            this.loadingWizard = value
        },
        handleValidation: function(isValid, tabIndex){
           console.log('Tab: '+tabIndex+ ' valid: '+isValid)
        },
        handleErrorMessage: function(errorMsg){
          this.errorMsg = errorMsg
        },
        validateAsync:function() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if(this.count < 1){
               this.count ++
              	reject('This is a custom validation error message. Click next again to get rid of the validation')
              }else{
               this.count = 0
               resolve(true)
              }   
            }, 1000)
          })
         },
       }
  }
</script>
</script>



## Element UI integration

<vuep template="#elementui"></vuep>

<script v-pre type="text/x-template" id="elementui">
<template>
  <form-wizard @on-complete="onComplete" shape="circle" color="#20a0ff" error-color="#ff4949">
    <tab-content title="Personal details" icon="ti-user" :before-change="validateFirstStep">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="ruleForm">
        <el-form-item label="Approved by" prop="user">
          <el-input v-model="formInline.user" placeholder="Approved by"></el-input>
        </el-form-item>
        <el-form-item label="Activity zone" prop="region">
          <el-select v-model="formInline.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

    </tab-content>
    <tab-content title="Additional Info" icon="ti-settings">
      Second tab
    </tab-content>
    <tab-content title="Last step" icon="ti-check">
      Yuhuuu! This seems pretty damn simple
    </tab-content>

    <el-button type="primary" slot="prev">Back</el-button>
    <el-button type="primary" slot="next">Next</el-button>
    <el-button type="primary" slot="finish">Finish</el-button>
  </form-wizard>
 
</template>

<script>
  Vue.use(VueFormWizard)
  export default {
     data() {
       return {
         formInline: {
           user: '',
           region: ''
         },
         rules: {
           user: [{
             required: true,
             message: 'Please input Activity name',
             trigger: 'blur'
           }, {
             min: 3,
             max: 5,
             message: 'Length should be 3 to 5',
             trigger: 'blur'
           }],
           region: [{
             required: true,
             message: 'Please select Activity zone',
             trigger: 'change'
           }],
         }
        }
       },
       methods: {
         onComplete: function() {
           alert('Yay. Done!');
         },
         validateFirstStep() {
           return new Promise((resolve, reject) => {
             this.$refs.ruleForm.validate((valid) => {
               resolve(valid);
             });
           })
     
         }
       }
  }
</script>
</script>


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
  *  Sets validation (on/off) for back button. By default back button ignores validation
  */
  validateOnBack: Boolean,
  /***
  * Applies to text, border and circle
  */
  color: {
    type: String,
    default: '#e74c3c' //circle, border and text color
  },
  /***
  *  Is set to current step and text when beforeChange function fails 
  */
  errorColor: {
    type: String,
    default: '#8b0000'
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
* **on-error** Called when `before-change` is a promised and is rejected with a message. The message is passed along `this.$emit('on-error', error)` See async validation fiddle
## Slots
* **Default** - Used for tab-contents
* **title** - Upper title section including sub-title
* **prev** - Previous button content (no need to worry about handling the button functionality)
* **next** - Next button content
* **finish** - Finish button content

## Contribution
1. Fork the repo
2. run `npm install`
3. `npm run dev` for launching the dev example
4. After making your changes make sure to pull the changes from the source repo to avoid conflicts
5. `npm run build` to generate the new js and css bundles 
6. Commit your changes + the js and css bundles so it's easy to test them right away in fiddles, codepen etc
7. Open a Pull Request. For more information refer to [github forking workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)


