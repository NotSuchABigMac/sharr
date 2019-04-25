<template>
  <div class="homepage">
    <br>
    sharr
    <br>
    a new stock market
    <br>
    simulation experience...
    <br>
    <div>like no other</div>
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
