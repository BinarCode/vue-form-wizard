<template>
  <div>
    <form-wizard @on-complete="onComplete"
                shape="circle"
                color="#e74c3c"
                class="card">
      <tab-content title="Personal details"
                   icon="ti-user">
        My first tab content
      </tab-content>
      <tab-content title="Additional Info"
                   icon="ti-settings">
        My second tab content
      </tab-content>
      <tab-content title="Last step"
                   icon="ti-check">
        Yuhuuu! This seems pretty damn simple
      </tab-content>

    </form-wizard>
  </div>
</template>

<script>

  export default {
    name: 'app',
    methods: {
      onComplete () {
        alert('Yay!')
      }
    }
  }
</script>
<style lang="scss">
  $border-radius-extreme:        6px !default;
  $white-color: white;
  $gray-input-bg:              #F3F2EE !default;
  $card-black-color:          #252422 !default;

  body {
    margin-top:20px;
    background-color:#ecf0f1;
  }

  .card-footer{
    padding:0px 20px;
  }

  .card{
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
