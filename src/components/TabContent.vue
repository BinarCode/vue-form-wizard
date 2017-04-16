<template>
  <div v-if="show" class="tab-container">
    <slot>
    </slot>
  </div>
</template>
<script>
  export default{
    name: 'tab-content',
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      beforeChange: {
        type: Function
      }
    },
    data () {
      return {
        show: false,
        active: false
      }
    }
  }
</script>
