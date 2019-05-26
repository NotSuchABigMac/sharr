<template>
  <div class="homepage">         
                    <div><router-link to="/"> Home </router-link></div>
                    <div><router-link to="/SearchStock"> Search Stock </router-link></div>
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
