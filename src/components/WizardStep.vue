<template>
  <li :class="{active:tab.active}">
    <a href="javascript:void(0)" :class="{disabled: !tab.checked}">
      <div class="wizard-icon-circle md"
           role="tab"
           :tabindex="tab.checked ? 0 : ''"
           :id="tab.tabId"
           :aria-controls="tab.title"
           :aria-disabled="tab.active"
           :aria-selected="tab.active"
           :class="{checked: tab.checked,square_shape:isStepSquare, tab_shape:isTabShape}"
           :style="[tab.checked ? stepCheckedStyle : {}, tab.validationError ? errorStyle : {}]">

        <transition :name="transition" mode="out-in">

            <div v-if="tab.active" class="wizard-icon-container"
                 :class="{square_shape:isStepSquare, tab_shape:isTabShape}"
                 :style="[tab.active ? iconActiveStyle: {}, tab.validationError ? errorStyle : {}]">
              <slot name="active-step">
                <i v-if="tab.icon" :class="tab.icon" class="wizard-icon"></i>
                <i v-else class="wizard-icon">{{index + 1}}</i>
              </slot>
            </div>
            <slot v-if="!tab.active">
              <i v-if="!tab.active && tab.icon" :class="tab.icon" class="wizard-icon"></i>
              <i v-if="!tab.active && !tab.icon" class="wizard-icon">{{index + 1}}</i>
            </slot>
        </transition>

      </div>
      <slot name="title">
        <span class="stepTitle"
              :class="{active:tab.active, has_error:tab.validationError}"
              :style="tab.active ? stepTitleStyle : {}">
              {{tab.title}}
        </span>
      </slot>
    </a>
  </li>
</template>
<script>
  export default {
    name: 'wizard-step',
    inject: ['color', 'shape', 'errorColor'],
    props: {
      tab: {
        type: Object,
        default: () => {

        }
      },
      transition: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
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
        let isError = this.tab.validationError
        return {
          color: isError ? this.errorColor : this.color
        }
      },
      isStepSquare () {
        return this.shape === 'square'
      },
      isTabShape () {
        return this.shape === 'tab'
      }
    }
  }
</script>
<style>
</style>
