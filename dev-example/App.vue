<template>
  <div>
    <button @click="tabs.shift()">Remove one tab</button>
    <button @click="tabs.push('testt')">Add one tab</button>
    <form-wizard @on-complete="onComplete"
                 :hide-buttons="false"
                 shape="square"
                 color="gray"
                 @on-loading="setLoading"
                 @on-error="setError"
                 class="card" ref="wizard">
      <tab-content v-for="tab in tabs" :title="tab" :key="tab" icon="ti-settings">
        {{tab}}
      </tab-content>
      <div class="loader" v-if="loadingWizard"></div>
      <div v-if="error">
        {{error}}
      </div>
    </form-wizard>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {
        loadingWizard: false,
        error: null,
        count: 0,
        tabs: ['test','test2','test3']
      }
    },
    methods: {
      onComplete () {
        alert('Yay!')
      },
      setLoading (value) {
        this.loadingWizard = value
      },
      setError (error) {
        this.error = error
      },
      validateAsync () {
        //simulating an error for the first time and a success for the second time
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (this.count < 1) {
              this.count ++
              reject('Some custom error')
            } else {
              resolve(true)
            }
          }, 1000)
        })
      },
      validate () {
        return true
      }
    }
  }
</script>
<style>
  @import "loader.css";
</style>
<style lang="scss">
  $border-radius-extreme: 6px !default;
  $white-color: white;
  $gray-input-bg: #F3F2EE !default;
  $card-black-color: #252422 !default;

  body {
    margin-top: 20px;
    background-color: #ecf0f1;
  }

  .card-footer {
    padding: 0px 20px;
  }

  .card {
    border-radius: $border-radius-extreme;
    box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
    background-color: $white-color;
    color: $card-black-color;
    padding: 10px 0;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

</style>
