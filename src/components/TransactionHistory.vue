<template>
  <div class="port">
    <h2>{{info.data}}</h2>
    <div class=mobile-navbar>
    <div class=backicon>
        <router-link to="/SearchStock"><img src="../assets/backbutton.png"/></router-link>
    </div>
    <div class=textbox id=stockbox>Transaction History</div>
    </div>
    <table id=foliotable>
      <tr class=folioheader><th scope="col">Trans. Type</th><th scope="col">Symbol</th><th scope="col">Price</th><th scope="col">Volume</th>
      <tr class=folioresults id=result1><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result2><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result3><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result4><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result5><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result6><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result7><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result8><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result9><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result10><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result11><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result12><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result13><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result14><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result15><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result16><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result17><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result18><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result19><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
      <tr class=folioresults id=result20><td class=type></td><td class=symbol></td><td class=price></td><td class=volume></td></tr>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
import store from '../store';
import Amplify, { Auth } from "aws-amplify";
import FusionCharts from "fusioncharts";
import { async } from 'q';
var request = require('request');

export default {
  data(){
    return {
      info: ''
    }
  },
  methods: {
    getTxns: async function() {
      let info = await Auth.currentUserInfo();
      console.log("INFO: ", info);
      console.log("LOCAL: ", this.$store.state.user);
      const balance = request({
        url: 'https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/stable/getTxns',
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
        setTxns(body);
      });
      console.log(balance);      
    },
    getBalance: async function() {
      var self = this;
      let info = await Auth.currentUserInfo();
      console.log("INFO: ", info);
      console.log("LOCAL: ", this.$store.state.user);
      const balance = request({
        url: 'https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/stable/getBalance',
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
        self.$parent.setLoggedInUser(self.$store.state.user.attributes.email, body.currentBalance);
      });
      
    }
  },
  mounted() {
      this.getTxns()
      this.getBalance();
  }
}
function setTxns(body) {
    var i = 0;
      for (i in body.data.Items) {
        console.log(body.data.Items[i])
        console.log(body.data.Items[i].symbol)
        document.getElementById("result" + Number(Number(i)+1)).firstChild.innerHTML = "Buy"
        document.getElementById("result" + Number(Number(i)+1)).firstChild.nextSibling.innerHTML = body.data.Items[i].symbol
        document.getElementById("result" + Number(Number(i)+1)).firstChild.nextSibling.nextSibling.innerHTML = body.data.Items[i].price
        document.getElementById("result" + Number(Number(i)+1)).firstChild.nextSibling.nextSibling.nextSibling.innerHTML = body.data.Items[i].volume
        document.getElementById("result" + Number(Number(i)+1)).style.display = "table-row";
    }
    }
</script>