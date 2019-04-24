<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      Homepage?
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["Home"],
  components: {},
  methods: {
    setChartData: function() {

    },
  },
  mounted: function() {
    this.setChartData();
  },
  watch: {
    tempVar: {
      handler: function() {
        this.setChartData();
      },
      deep: true
    },
  },
};
</script>

<style>
</style>
