<template>
  <div class="col-xs-8 col-xs-offset-2">
    <tab-wizard @on-complete="onComplete">
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
    </tab-wizard>
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
