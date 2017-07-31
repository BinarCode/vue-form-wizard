<template>
  <div>
    <button @click="tabs.shift()">Remove one at start</button>
    <button @click="tabs.push('testt')">Add at the end</button>
    <button @click="tabs.unshift('new start')">Add one at start</button>
    <form-wizard @on-complete="onComplete"
                 :hide-buttons="false"
                 shape="square"
                 color="gray"
                 @on-loading="setLoading"
                 @on-error="setError"
                 class="card" ref="wizard">
      <template slot="step" scope="props">
        <wizard-step :tab="props.tab"
                     :transition="props.transition"
                     :key="props.tab.title"
                     :index="props.index">
        </wizard-step>
      </template>

       <tab-content title="Personal details" icon="ti-user">
         My first tab
       </tab-content>
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
  import TabContent from "../src/components/TabContent";

  export default {
    components: {TabContent},
    name: 'app',
    data () {
      return {
        loadingWizard: false,
        error: null,
        count: 0,
        tabs: ['test', 'test2', 'test3']
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
            if (this.count % 2 === 0) {
              reject('Some custom error')
            } else {
              resolve(true)
            }
            this.count++
          }, 100)
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
