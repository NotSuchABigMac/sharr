<template>
  <div class="homepage">
      <div v-if="!signedIn">
        <amplify-authenticator></amplify-authenticator>
      </div>
      <div v-if="signedIn">
        <div class="homebuttons" @click="buyOrder">BUY</div>
        <div class="homebuttons" @click="getBalance">BALANCE</div>
        <amplify-sign-out></amplify-sign-out>
      </div>
      <div class=homebuttons><router-link to="/"> Home </router-link></div>
      <div class=homebuttons><router-link to="/SearchStock"> Search Stock </router-link></div>
  </div>
</template>

<script>
import Amplify, { Auth } from "aws-amplify";
import { AmplifyEventBus } from 'aws-amplify-vue';
import store from '../store';
import { async } from 'q';
import { functionDeclaration } from '@babel/types';
var request = require('request');

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
    getBalance: async function() {
      let info = await Auth.currentUserInfo();
      console.log("INFO: ", info);
      console.log("LOCAL: ", this.$store.state.user);

      const balance = request({
        url: 'https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/getBalance',
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": this.$store.state.user.signInUserSession.idToken.jwtToken
        },
        json: true,
      }, function(err, res, body) {
        console.log("err: ", err);
        console.log("res: ", res);
        console.log("bod: ", body);
      });
      console.log(balance);
    },
    buyOrder: async function() {
      let info = await Auth.currentUserInfo();
      console.log("INFO: ", info);
      console.log("LOCAL: ", this.$store.state.user);
      const POST_BODY = {
        symbol: "MSFT",
        volume: 2000
      }
      request({
        url: "https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/buyOrder/",
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": this.$store.state.user.signInUserSession.idToken.jwtToken
        },
        json: true,
        body: POST_BODY
      }, function(err, res, body) {
        console.log("err: ", err);
        console.log("res: ", res);
        console.log("bod: ", body);
      });
    },
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
