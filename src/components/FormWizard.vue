<template>
  <div class="vue-form-wizard">
    <div class="wizard-header">
      <slot name="title">
        <h4 class="wizard-title">{{title}}</h4>
        <p class="category">{{subtitle}}</p>
      </slot>
    </div>
    <div class="wizard-navigation">
      <div class="wizard-progress-with-circle">
        <div class="wizard-progress-bar"
             :style="progressBarStyle"></div>
      </div>
      <ul class="wizard-nav wizard-nav-pills">
        <li v-for="(tab, index) in tabs" :class="{active:tab.active}">
          <a href="" @click.prevent="navigateToTab(index, false)">
            <div class="wizard-icon-circle"
                 :class="{checked:isChecked(index),square_shape:isStepSquare, tab_shape:isTabShape}"
                 :style="[isChecked(index)? stepCheckedStyle : {}, tab.validationError ? errorStyle : {}]">

              <transition :name="transition" mode="out-in">
                <div v-if="tab.active" class="wizard-icon-container"
                     :class="{square_shape:isStepSquare, tab_shape:isTabShape}"
                     :style="[tab.active ? iconActiveStyle: {}, tab.validationError ? errorStyle : {}]">
                  <i v-if="tab.icon" :class="tab.icon" class="wizard-icon"></i>
                  <i v-else class="wizard-icon">{{index + 1}}</i>
                </div>
                <i v-if="!tab.active && tab.icon" :class="tab.icon" class="wizard-icon"></i>
                <i v-if="!tab.active && !tab.icon" class="wizard-icon">{{index + 1}}</i>
              </transition>

            </div>
            <span class="stepTitle"
                  :class="{active:tab.active, has_error:tab.validationError}"
                  :style="tab.active ? stepTitleStyle : {}">
              {{tab.title}}
            </span>

          </a>
        </li>
      </ul>
      <div class="wizard-tab-content">
        <slot>
        </slot>
      </div>
    </div>

    <div class="wizard-card-footer clearfix" v-if="!hideButtons">
      <template>
        <span @click="prevTab" v-if="displayPrevButton" class="wizard-footer-left">
          <slot name="prev">
            <button type="button" class="wizard-btn btn-default wizard-btn-wd" :style="fillButtonStyle"
                    :disabled="loading">
              {{backButtonText}}
            </button>
          </slot>
        </span>
      </template>

      <template>
         <span @click="finish" class="wizard-footer-right" v-if="isLastStep">
           <slot name="finish">
             <button type="button" class="wizard-btn btn-fill wizard-btn-wd btn-next" :style="fillButtonStyle">
              {{finishButtonText}}
            </button>
          </slot>
        </span>
      </template>

      <template>
        <span @click="nextTab" class="wizard-footer-right" v-if="!isLastStep">
         <slot name="next">
           <button type="button" class="wizard-btn btn-fill wizard-btn-wd btn-next" :style="fillButtonStyle"
                   :disabled="loading">
            {{nextButtonText}}
           </button>
         </slot>
       </span>
      </template>

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
      hideButtons: {
        type: Boolean,
        default: false
      },
      validateOnBack: Boolean,
      /***
       * Applies to text, border and circle
       */
      color: {
        type: String,
        default: '#e74c3c'
      },
      errorColor: {
        type: String,
        default: '#8b0000'
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
        default: 0,
        validator: (value) => {
          return value >= 0
        }
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
      errorStyle () {
        return {
          borderColor: this.errorColor,
          backgroundColor: this.errorColor
        }
      },
      stepTitleStyle () {
        var isError = this.tabs[this.activeTabIndex].validationError
        return {
          color: isError ? this.errorColor : this.color
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
      navigateToTab (index, validate = true) {
        if (index <= this.maxStep) {
          let cb = () => {
            this.setValidationError(null)
            this.changeTab(this.activeTabIndex, index)
          }
          if (validate) {
            this.beforeTabChange(this.activeTabIndex, cb)
          } else {
            cb()
          }
        }
      },
      nextTab () {
        let cb = () => {
          if (this.activeTabIndex < this.tabCount - 1) {
            this.changeTab(this.activeTabIndex, this.activeTabIndex + 1)
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
            this.setValidationError(null)
            this.changeTab(this.activeTabIndex, this.activeTabIndex - 1)
            this.isLastStep = false
          }
        }
        if (this.validateOnBack) {
          this.beforeTabChange(this.activeTabIndex, cb)
        } else {
          cb()
        }
      },
      finish () {
        let cb = () => {
          this.$emit('on-complete')
        }
        this.beforeTabChange(this.activeTabIndex, cb)
      },
      setLoading (value) {
        this.loading = value
        this.$emit('on-loading', value)
      },
      setValidationError (error) {
        this.tabs[this.activeTabIndex].validationError = error
        this.$emit('on-error', error)
      },
      validateBeforeChange (promiseFn, callback) {
        this.setValidationError(null)
        // we have a promise
        if (promiseFn.then && typeof promiseFn.then === 'function') {
          this.setLoading(true)
          promiseFn.then((res) => {
            this.setLoading(false)
            let validationResult = res === true
            this.executeBeforeChange(validationResult, callback)
          }).catch((error) => {
            this.setLoading(false)
            this.setValidationError(error)
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
        } else {
          this.tabs[this.activeTabIndex].validationError = 'error'
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
        this.tryChangeRoute(newTab)
        this.increaseMaxStep()
        return true
      },
      tryChangeRoute (tab) {
        if (this.$router && tab.route) {
          this.$router.push(tab.route)
        }
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
      checkRouteChange (route) {
        let matchingTabIndex = -1
        let matchingTab = this.tabs.find((tab, index) => {
          let match = tab.route === route
          if (match) {
            matchingTabIndex = index
          }
          return match
        })

        if (matchingTab && !matchingTab.active) {
          const shouldValidate = matchingTabIndex > this.activeTabIndex
          this.navigateToTab(matchingTabIndex, shouldValidate)
        }
      },
      getTabs () {
        return this.$children.filter((comp) => comp.$options.name === 'tab-content')
      },
      activateTab (index) {
        let tab = this.tabs[index]
        tab.active = true
        this.tryChangeRoute(tab)
      },
      activateTabAndCheckStep (index) {
        this.activateTab(index)
        this.checkStep()
        this.maxStep = this.startIndex
        this.activeTabIndex = this.startIndex
      },
      initializeTabs () {
        this.tabs = this.getTabs()
        if (this.tabs.length > 0 && this.startIndex === 0) {
          this.activateTab(this.activeTabIndex)
        }
        if (this.startIndex < this.tabs.length) {
          this.activateTabAndCheckStep(this.startIndex)
        } else {
          console.warn(`Prop startIndex set to ${this.startIndex} is greater than the number of tabs - ${this.tabs.length}. Make sure that the starting index is less than the number of tabs registered`)
        }
      },
      reinitializeTabs () {
        let currentTabs = this.getTabs()
        if (this.tabs.length === 0 || this.tabs.length === currentTabs.length) return
        this.tabs = currentTabs
        let oldTabIndex = -1
        this.tabs.find((tab, index) => {
          if (tab.active) {
            oldTabIndex = index
          }
          return tab.active
        })
        if (oldTabIndex === -1) {
          oldTabIndex = this.activeTabIndex > 0 ? this.activeTabIndex - 1 : 0
        }

        this.tabs.forEach((tab) => {
          tab.active = false
        })
        this.activateTab(oldTabIndex)
        this.maxStep = oldTabIndex
        this.activeTabIndex = oldTabIndex
      }
    },
    mounted () {
      this.initializeTabs()
    },
    /***
     * Used to handle dynamic tab addition from an array since $children is not reactive
     */
    updated () {
      this.reinitializeTabs()
    },
    watch: {
      '$route.path': function (newRoute) {
        this.checkRouteChange(newRoute)
      }
    }
  }
</script>
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
