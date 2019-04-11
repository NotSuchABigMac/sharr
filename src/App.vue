<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Graph v-bind:weather_data="weather_data"></Graph>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Graph from './components/Graph.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Graph
  },
  data () {
    return {
      filename: 'App.vue',
      weather_data: {
        location: "California",
        temperature: {
          current: "35 C",
        },
        highlights: {
          uvindex: "3",
          windstatus: {
            speed: "20 km/h",
            direction: "N-E",
          },
          visibility: "12 km",
        },
      },
    }
  },
  methods: {

  },
  computed: {

  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
