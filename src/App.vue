<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
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