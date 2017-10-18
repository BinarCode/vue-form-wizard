<template>
    <div class="wizard-tab-container"
         role="tabpanel"
         :id="title"
         :aria-hidden="!active"
         :aria-labelledby="title">
      <slot :active="active">
      </slot>
    </div>
</template>
<script>
  export default{
    name: 'tab-content',
    inject: ['addTab', 'removeTab', 'reRegisterTabs'],
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
      },
      route: {
        type: [String, Object]
      }
    },
    data () {
      return {
        active: false,
        validationError: null,
        checked: false
      }
    },
    mounted () {
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
