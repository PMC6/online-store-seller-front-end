<template>
  <div id="app">
<<<<<<< HEAD
    <home></home>
=======
    <sellerheader class="seller-header"></sellerheader>
    <!-- <usershow style="margin-top:10px;"></usershow> -->
    <div class="container-fluid" style="display:flex; height:750px; margin:0;padding:0;">
      <login v-if="loginshow"></login>
      <v-nav v-if="navshow"></v-nav>
     
      <!-- <v-nav ></v-nav> -->
    </div>
>>>>>>> e8923f1bfd05f5b20f3c44f86be7bb685b3a4f26
  </div>
</template>

<script>
<<<<<<< HEAD
import home from "./components/home";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    home
  },
  mounted () {
    this.$router.push('/home')
=======
import sellerheader from "./components/sellerHeader";
import snav from "./components/Snav";
//import sellermain from './components/sellerMain'
import usershow from "./components/userShow";
import login from "./components/login";
import Bus from "./components/bus";

export default {
  name: "App",
  data() {
    return {
      loginshow: true,
      navshow: false,
      username: ""
    };
  },
  components: {
    sellerheader: sellerheader,
    "v-nav": snav,
    usershow: usershow,
    login: login
>>>>>>> e8923f1bfd05f5b20f3c44f86be7bb685b3a4f26
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background-image: url(./assets/bgi.png);
  background-size: contain; */
}
</style>