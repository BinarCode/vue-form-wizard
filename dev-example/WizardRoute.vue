<template>
  <div>
    <button @click="tabs.shift()">Remove one at start</button>
    <button @click="tabs.push('testt')">Add at the end</button>
    <button @click="tabs.unshift('new start')">Add one at start</button>
    <router-link to="/test">Go to a different route</router-link>
    <form-wizard @on-complete="onComplete"
                 @on-change="handleChange"
                 :start-index.sync="activeIndex"
                 color="#e74c3c">
       <tab-content v-for="tab in tabs" :title="tab" :key="tab">{{tab}}</tab-content>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
    </form-wizard>
  </div>
</template>

<script>
  import TabContent from "../src/components/TabContent";
  export default {
    components: {TabContent},
    data () {
      return {
        loadingWizard: false,
        error: null,
        count: 0,
        tabs: ['test', 'test2', 'test3'],
        activeIndex: 0
      }
    },
    methods: {
      onComplete () {
        alert('Yay!')
      },
      setLoading (value) {
        this.loadingWizard = value
      },
      handleChange(prevIndex, nextIndex){
          console.log(`Changing from ${prevIndex} to ${nextIndex}`)
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
  .steps-size{
    width: 200px;
    height: 400px;
  }
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
