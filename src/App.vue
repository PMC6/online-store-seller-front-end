<template>
  <div id="app">
    <sellerheader class="seller-header"></sellerheader>
    <!-- <usershow style="margin-top:10px;"></usershow> -->
    <div class="container" style="display:flex; height:800px;">
      <login v-if="loginshow"></login>
      <v-nav v-if="navshow"></v-nav>
      <!-- <v-nav ></v-nav>-->
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url(./assets/xingkong.png);
  background-size: contain;
}
/* .seller-header{
  zoom: 1;
} */
</style>