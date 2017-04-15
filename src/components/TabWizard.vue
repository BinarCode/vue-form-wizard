<template>
  <div>
    <div class="header text-center">
      <h4 class="title">{{title}}</h4>
      <p class="category">{{subtitle}}</p>
    </div>
    <div class="content">
      <div>
        <ul class="nav nav-pills">
          <li v-for="(tab, index) in tabs" :class="tab.active ? 'active' : ''">
            <a href="" @click.prevent="navigateToTab(index)">{{tab.title}}</a>
          </li>
        </ul>
        <div class="tab-content">
          <slot>
          </slot>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button v-if="displayPrevButton" type="button" class="btn btn-default btn-fill btn-wd btn-back pull-left"
              @click="prevTab">
        {{backButtonText}}
      </button>
      <button v-if="isLastStep" type="button" class="btn btn-info btn-fill btn-wd btn-next pull-right" @click="nextTab">
        {{finishButtonText}}
      </button>
      <button v-else type="button" class="btn btn-info btn-fill btn-wd btn-next pull-right" @click="nextTab">
        {{nextButtonText}}
      </button>
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
      }
    },
    data () {
      return {
        activeTabIndex: 0,
        isLastStep: false,
        maxStep: 0,
        tabs: []
      }
    },
    computed: {
      tabCount () {
        return this.tabs.length
      },
      displayPrevButton () {
        return this.activeTabIndex !== 0
      }
    },
    methods: {
      navigateToTab (index) {
        if (index <= this.maxStep && this.beforeTabChange(this.activeTabIndex)) {
          this.changeTab(this.activeTabIndex, index)
        }
      },
      beforeTabChange (index) {
        let oldTab = this.tabs[index]
        if (oldTab && oldTab.beforeChange !== undefined) {
          return oldTab.beforeChange()
        }
        return true
      },
      changeTab (oldIndex, newIndex) {
        let oldTab = this.tabs[oldIndex]
        let newTab = this.tabs[newIndex]
        if (oldTab) {
          oldTab.show = false
          oldTab.active = false
        }
        if (newTab) {
          newTab.show = true
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
        if (!this.beforeTabChange(this.activeTabIndex)) return

        if (this.activeTabIndex < this.tabCount - 1) {
          this.activeTabIndex++
          this.increaseMaxStep()
          this.checkStep()
        } else {
          this.isLastStep = true
          this.$emit('finished')
        }
      },
      prevTab () {
        if (!this.beforeTabChange(this.activeTabIndex)) return

        if (this.activeTabIndex > 0) {
          this.activeTabIndex--
          this.isLastStep = false
        }
      }
    },
    mounted () {
      this.tabs = this.$children.filter((comp) => comp.$options.name === 'tab-content')
      if (this.tabs.length > 0) {
        let firstTab = this.tabs[this.activeTabIndex]
        firstTab.show = true
        firstTab.active = true
      }
    },
    watch: {
      activeTabIndex: function (newVal, oldVal) {
        if (this.beforeTabChange(oldVal)) {
          this.changeTab(oldVal, newVal)
        }
      }
    }
}
</script>
<style>
  .card-wizard .nav-pills {
    display: flex;
  }

  .card-wizard .nav-pills li,
  .card-wizard .nav-pills a {
    display: flex;
    justify-content: center;
    flex: 1;
  }
</style>
