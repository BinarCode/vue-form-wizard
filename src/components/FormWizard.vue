<template>
  <div class="vue-tab-wizard">
    <div class="wizard-header">
      <slot name="title" class="wizard-title">
        <h4 class="wizard-title">{{title}}</h4>
        <p class="category">{{subtitle}}</p>
      </slot>
    </div>
    <div class="wizard-navigation">
      <div class="progress-with-circle">
        <div class="progress-bar"
             :style="progressBarStyle"></div>
      </div>
      <ul class="nav nav-pills">
        <li v-for="(tab, index) in tabs" :class="{active:tab.active}">
          <a href="" @click.prevent="navigateToTab(index)">
            <div class="icon-circle" :class="{checked:isChecked(index),square_shape:isStepSquare, tab_shape:isTabShape}"
                 :style="isChecked(index)? stepCheckedStyle : {}">
              <transition :name="transition" mode="out-in">
                <div v-if="tab.active" class="icon-container" :class="{square_shape:isStepSquare, tab_shape:isTabShape}"
                     :style="tab.active ? iconActiveStyle: {}">
                  <i v-if="tab.icon" :class="tab.icon" class="icon"></i>
                  <i v-else class="icon">{{index + 1}}</i>
                </div>
                <i v-if="!tab.active && tab.icon" :class="tab.icon" class="icon"></i>
                <i v-if="!tab.active && !tab.icon" class="icon">{{index + 1}}</i>
              </transition>
            </div>
            <span class="stepTitle" :style="tab.active ? stepTitleStyle : {}">
              {{tab.title}}
            </span>

          </a>
        </li>
      </ul>
      <div class="tab-content">
        <slot>
        </slot>
      </div>
    </div>

    <div class="card-footer">
      <template>
        <span @click="prevTab" v-if="displayPrevButton">
          <slot name="prev">
            <button type="button" class="btn btn-default btn-wd" :style="fillButtonStyle" :disabled="loading">
              {{backButtonText}}
            </button>
          </slot>
        </span>
      </template>

      <template>
         <span @click="finish" class="pull-right" v-if="isLastStep">
           <slot name="finish">
             <button type="button" class="btn btn-fill btn-wd btn-next" :style="fillButtonStyle">
              {{finishButtonText}}
            </button>
          </slot>
        </span>
      </template>

      <template>
        <span @click="nextTab" class="pull-right" v-if="!isLastStep">
         <slot name="next">
           <button type="button" class="btn btn-fill btn-wd btn-next" :style="fillButtonStyle" :disabled="loading">
            {{nextButtonText}}
           </button>
         </slot>
       </span>
      </template>

      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
  export default{
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
        default: '#e74c3c'
      },
      shape: {
        type: String,
        default: 'circle'
      },
      /**
       * Name of the transition when transition between steps
       * */
      transition: {
        type: String,
        default: ''
      },
      /***
       *
       * Index of the initial tab to display
       */
      startIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        activeTabIndex: 0,
        isLastStep: false,
        currentPercentage: 0,
        maxStep: 0,
        loading: false,
        tabs: []
      }
    },
    computed: {
      tabCount () {
        return this.tabs.length
      },
      displayPrevButton () {
        return this.activeTabIndex !== 0
      },
      stepPercentage () {
        return 1 / (this.tabCount * 2) * 100
      },
      progressBarStyle () {
        return {
          backgroundColor: this.color,
          width: `${this.progress}%`,
          color: this.color
        }
      },
      iconActiveStyle () {
        return {
          backgroundColor: this.color
        }
      },
      stepCheckedStyle () {
        return {
          borderColor: this.color
        }
      },
      stepTitleStyle () {
        return {
          color: this.color
        }
      },
      isStepSquare () {
        return this.shape === 'square'
      },
      isTabShape () {
        return this.shape === 'tab'
      },
      fillButtonStyle () {
        return {
          backgroundColor: this.color,
          borderColor: this.color,
          color: 'white'
        }
      },
      progress () {
        let percentage = 0
        if (this.activeTabIndex > 0) {
          let stepsToAdd = 1
          let stepMultiplier = 2
          percentage = this.stepPercentage * ((this.activeTabIndex * stepMultiplier) + stepsToAdd)
        } else {
          percentage = this.stepPercentage
        }
        return percentage
      }
    },
    methods: {
      isChecked (index) {
        return index <= this.maxStep
      },
      navigateToTab (index) {
        if (index <= this.maxStep) {
          let cb = () => {
            this.changeTab(this.activeTabIndex, index)
          }
          this.beforeTabChange(this.activeTabIndex, cb)
        }
      },
      setLoading (value) {
        this.loading = value
        this.$emit('on-loading', value)
      },
      validateBeforeChange (promiseFn, callback) {
        // we have a promise
        if (promiseFn.then && typeof promiseFn.then === 'function') {
          this.setLoading(true)
          promiseFn.then((res) => {
            this.setLoading(false)
            let validationResult = res === true
            this.executeBeforeChange(validationResult, callback)
          }).catch(() => {
            this.setLoading(false)
          })
          // we have a simple function
        } else {
          let validationResult = promiseFn === true
          this.executeBeforeChange(validationResult, callback)
        }
      },
      executeBeforeChange (validationResult, callback) {
        this.$emit('on-validate', validationResult, this.activeTabIndex)
        if (validationResult) {
          callback()
        }
      },
      beforeTabChange (index, callback) {
        if (this.loading) {
          return
        }
        let oldTab = this.tabs[index]
        if (oldTab && oldTab.beforeChange !== undefined) {
          let tabChangeRes = oldTab.beforeChange()
          this.validateBeforeChange(tabChangeRes, callback)
        } else {
          callback()
        }
      },
      changeTab (oldIndex, newIndex) {
        let oldTab = this.tabs[oldIndex]
        let newTab = this.tabs[newIndex]
        if (oldTab) {
          oldTab.active = false
        }
        if (newTab) {
          newTab.active = true
        }
        this.activeTabIndex = newIndex
        this.checkStep()
        return true
      },
      checkStep () {
        if (this.activeTabIndex === this.tabCount - 1) {
          this.isLastStep = true
        } else {
          this.isLastStep = false
        }
      },
      increaseMaxStep () {
        if (this.activeTabIndex > this.maxStep) {
          this.maxStep = this.activeTabIndex
        }
      },
      nextTab () {
        let cb = () => {
          if (this.activeTabIndex < this.tabCount - 1) {
            this.changeTab(this.activeTabIndex, this.activeTabIndex + 1)
            this.increaseMaxStep()
          } else {
            this.isLastStep = true
            this.$emit('finished')
          }
        }
        this.beforeTabChange(this.activeTabIndex, cb)
      },
      prevTab () {
        let cb = () => {
          if (this.activeTabIndex > 0) {
            this.changeTab(this.activeTabIndex, this.activeTabIndex - 1)
            this.isLastStep = false
          }
        }
        this.beforeTabChange(this.activeTabIndex, cb)
      },
      finish () {
        let cb = () => {
          this.$emit('on-complete')
        }
        this.beforeTabChange(this.activeTabIndex, cb)
      }
    },
    mounted () {
      this.tabs = this.$children.filter((comp) => comp.$options.name === 'tab-content')
      if (this.tabs.length > 0 && this.startIndex === 0) {
        let firstTab = this.tabs[this.activeTabIndex]
        firstTab.active = true
      }
      if (this.startIndex < this.tabs.length) {
        let tabToActivate = this.tabs[this.startIndex]
        this.activeTabIndex = this.startIndex
        tabToActivate.active = true
        this.maxStep = this.startIndex
      } else {
        console.warn(`Prop startIndex set to ${this.startIndex} is greater than the number of tabs - ${this.tabs.length}. Make sure that the starting index is less than the number of tabs registered`)
      }
    }
  }
</script>
<style>
  @import "./../assets/tab-wizard/bootstrap.min.css";
</style>
<style lang="scss">
  @import "./../assets/wizard";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
</style>
