<template>
<!-- 页面主要内容 -->
    <div class="container-fluid" style="display:flex; height:750px; margin:0;padding:0;">
      <!-- 登录 -->
      <login v-if="loginshow"></login>
      <v-nav v-if="navshow"></v-nav>
    </div>
</template>
<script>
import snav from "./Snav";
import login from "./login";
import Bus from "./bus";
import advertise from "./advertisement";
export default {
  data() {
    return {
      loginshow: true,
      navshow: false,
      username: ""
    };
  },
     components: {
    "v-nav": snav,
    login: login,
  }
}
</script>

