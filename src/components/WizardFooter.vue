<template>
  <div  v-if="!hideButtons"
        class="wizard-card-footer clearfix">
    <slot name="footer"
          v-bind="slotProps">
      <div class="wizard-footer-left">
          <span @click="prevTab"
                @keyup.enter="prevTab"
                v-if="displayPrevButton"
                role="button"
                tabindex="0">
            <slot name="prev" v-bind="slotProps">
              <wizard-button :style="fillButtonStyle"
                             :disabled="loading">
                {{backButtonText}}
              </wizard-button>
            </slot>
          </span>
        <slot name="custom-buttons-left" v-bind="slotProps"></slot>
      </div>

      <div class="wizard-footer-right">
        <slot name="custom-buttons-right" v-bind="slotProps"></slot>
        <span v-if="isLastStep"
              @click="nextTab"
              @keyup.enter="nextTab"
              role="button"
              tabindex="0">
              <slot name="finish" v-bind="slotProps">
               <wizard-button :style="fillButtonStyle">
                {{finishButtonText}}
              </wizard-button>
            </slot>
          </span>
        <span v-else
              @click="nextTab"
              @keyup.enter="nextTab"
              role="button"
              tabindex="0">
           <slot name="next" v-bind="slotProps" >
             <wizard-button :style="fillButtonStyle"
                            :disabled="loading">
              {{nextButtonText}}
             </wizard-button>
           </slot>
         </span>
      </div>

    </slot>
  </div>
</template>
<script>
    export default {
      props: {
        slotProps: {
          type: Object,
          default: () => {}
        }
      }
    }
</script>
<style>
</style>
