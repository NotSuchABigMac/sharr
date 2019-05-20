<template>
  <div class="homepage">
    <div class="auth">
      <amplify-authenticator></amplify-authenticator>
      <amplify-sign-out v-if="signedIn"></amplify-sign-out>
    </div>
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
import Amplify, { Auth } from "aws-amplify";
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  data() {
    return {
      signedIn: false
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
        this.signedIn = false;
      }
    });
  },
  methods: {
    setChartData: function() {

    },
    async isUserSignedIn() {
      try {
        const userObj = await Auth.currentAuthenticatedUser();
        // If it gets to here, then the user is signed in
        this.signedIn = true;
        console.log(userObj);
      } catch(err) {
        this.signedIn = false;
        console.log(err);
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
