<template>
  <div>
    <form-wizard @on-complete="onComplete"
                 color="gray"
                 error-color="#a94442">
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
                            ref="secondTabForm">
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
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg-core.css'
  import 'bootstrap/dist/css/bootstrap.css'
  import Vue from "vue";
  Vue.use(VueFormGenerator)
  export default {
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          email: '',
          streetName: '',
          streetNumber: '',
          city: '',
          country: ''
        },
        formOptions: {
          validationErrorClass: "has-error",
          validationSuccessClass: "has-success",
          validateAfterChanged: true
        },
        firstTabSchema: {
          fields: [{
            type: "input",
            inputType: "text",
            label: "First name",
            model: "firstName",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: 'col-xs-6'
          },
            {
              type: "input",
              inputType: "text",
              label: "Last name",
              model: "lastName",
              required: true,
              validator: VueFormGenerator.validators.string,
              styleClasses: 'col-xs-6'
            },
            {
              type: "input",
              inputType: "text",
              label: "Email",
              model: "email",
              required: true,
              validator: VueFormGenerator.validators.email,
              styleClasses: 'col-xs-12'
            }
          ]
        },
        secondTabSchema: {
          fields: [
            {
              type: "input",
              inputType: "text",
              label: "Street name",
              model: "streetName",
              required: true,
              validator: VueFormGenerator.validators.string,
              styleClasses: 'col-xs-9'
            },
            {
              type: "input",
              inputType: "text",
              label: "Street number",
              model: "streetNumber",
              required: true,
              validator: VueFormGenerator.validators.string,
              styleClasses: 'col-xs-3'
            },
            {
              type: "input",
              inputType: "text",
              label: "City",
              model: "city",
              required: true,
              validator: VueFormGenerator.validators.string,
              styleClasses: 'col-xs-6'
            },
            {
              type: "select",
              label: "Country",
              model: "country",
              required: true,
              validator: VueFormGenerator.validators.string,
              values: ['United Kingdom', 'Romania', 'Germany'],
              styleClasses: 'col-xs-6'
            },
          ]
        }
      }
    },
    methods: {
      onComplete() {
        alert('Yay. Done!');
      },
      validateFirstTab() {
        return this.$refs.firstTabForm.validate();
      },
      validateSecondTab: function () {
        return this.$refs.secondTabForm.validate();
      },

      prettyJSON(json) {
        if (json) {
          json = JSON.stringify(json, undefined, 4);
          json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
          });
        }
      }
    }
  }
</script>
<style>
</style>
