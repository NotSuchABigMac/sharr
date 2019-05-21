<template>
  <div class="port">
    <h1>Hello world</h1>
    <h2>{{info.data}}</h2>
  </div>
</template>
<script>
import axios from 'axios';
import store from '../store';

export default {
  data(){
    return {
      info: ''
    }
  },
  mounted() {
    if(this.$store.state.user) {
      const jwt = this.$store.state.user
      .getSignInUserSession()
      .getIdToken()
      .getJwtToken();
      const config = {
        headers: {
          authorization: jwt
        }
      }
      axios.get('https://bn0z89sji4.execute-api.ap-southeast-2.amazonaws.com/Beta/m', config)
      .then(val => this.info = val)
      .catch(err => console.log(err))
    }
  }
}
</script>
