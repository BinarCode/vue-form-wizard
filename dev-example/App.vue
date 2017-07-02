<template>
  <div>
    <button @click="tabs.shift()">Remove one tab</button>
    <button @click="tabs.push('testt')">Add one tab</button>
    <form-wizard @on-complete="onComplete"
                 color="gray"
                 error-color="#a94442"
    >
      <tab-content title="Personal details"
                   icon="ti-user" :before-change="validateFirstTab">
        <vue-form-generator :model="model"
                            :schema="firstTabSchema"
                            :options="formOptions"
                            ref="firstTabForm">

        </vue-form-generator>
      </tab-content>
      <tab-content title="Additional Info"
                   icon="ti-settings" :before-change="validateSecondTab">
        <vue-form-generator :model="model"
                            :schema="secondTabSchema"
                            :options="formOptions"
                            ref="secondTabForm"
        >
        </vue-form-generator>

      </tab-content>
      <tab-content title="Last step"
                   icon="ti-check">
        <h4>Your json is ready!</h4>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import VueFormGenerator from 'vue-form-generator'
  Vue.use(VueFormGenerator)
  export default {
    name: 'app',
    data () {
      return {
        model:{
          firstName:'',
          lastName:'',
          email:'',
          streetName:'',
          streetNumber:'',
          city:'',
          country:''
        },
        formOptions: {
          validationErrorClass: "has-error",
          validationSuccessClass: "has-success",
          validateAfterChanged: true
        },
        firstTabSchema:{
          fields:[{
            type: "input",
            inputType: "text",
            label: "First name",
            model: "firstName",
            required:true,
            validator:VueFormGenerator.validators.string,
            styleClasses:'col-xs-6'
          },
            {
              type: "input",
              inputType: "text",
              label: "Last name",
              model: "lastName",
              required:true,
              validator:VueFormGenerator.validators.string,
              styleClasses:'col-xs-6'
            },
            {
              type: "input",
              inputType: "text",
              label: "Email",
              model: "email",
              required:true,
              validator:VueFormGenerator.validators.email,
              styleClasses:'col-xs-12'
            }
          ]
        },
        secondTabSchema:{
          fields:[
            {
              type: "input",
              inputType: "text",
              label: "Street name",
              model: "streetName",
              required:true,
              validator:VueFormGenerator.validators.string,
              styleClasses:'col-xs-9'
            },
            {
              type: "input",
              inputType: "text",
              label: "Street number",
              model: "streetNumber",
              required:true,
              validator:VueFormGenerator.validators.string,
              styleClasses:'col-xs-3'
            },
            {
              type: "input",
              inputType: "text",
              label: "City",
              model: "city",
              required:true,
              validator:VueFormGenerator.validators.string,
              styleClasses:'col-xs-6'
            },
            {
              type: "select",
              label: "Country",
              model: "country",
              required:true,
              validator:VueFormGenerator.validators.string,
              values:['United Kingdom','Romania','Germany'],
              styleClasses:'col-xs-6'
            },
          ]
        }
      }
    },
    methods: {
      onComplete: function(){
        alert('Yay. Done!');
      },
      validateFirstTab: function(){
        return this.$refs.firstTabForm.validate();
      },
      validateSecondTab: function(){
        return this.$refs.secondTabForm.validate();
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
