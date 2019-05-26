<template>
  <div class="homepage">         
                    <div><router-link to="/"> Home </router-link></div>
                    <div><router-link to="/SearchStock"> Search Stock </router-link></div>
  </div>
</template>

<script>
import Amplify, { Auth } from "aws-amplify";
import { AmplifyEventBus } from 'aws-amplify-vue';
import store from '../store';

export default {
  data() {
    return {
      
    }
  },
  props: ["Home"],
  components: {},
  created() {
    this.isUserSignedIn();
    AmplifyEventBus.$on('authState', info => {
      if(info === 'signedIn') {
        this.isUserSignedIn();
      } else {
        this.$store.state.signedIn = false;
        this.$store.state.user = null;
      }
    });
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    }
  },
  methods: {
    setChartData: function() {

    },
    async isUserSignedIn() {
      try {
        const userObj = await Auth.currentAuthenticatedUser();
        // If it gets to here, then the user is signed in
        this.$store.state.signedIn = true;
        this.$store.state.user = userObj;
        console.log(userObj);
      } catch(err) {
        console.log(err);
        this.$store.state.signedIn = false;
        this.$store.state.user = null;
      }
    }
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
