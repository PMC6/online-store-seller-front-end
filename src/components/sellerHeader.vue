// 头部通栏
<template>
  <div class="container-fluid" style=" ">
    <!-- <div class="container" style=" height:100%   "> -->
    <!-- logo位置 -->
    <div class="logo" style=" float:left;">
      <img src="../assets/logo.png">
    </div>
    <!-- 右侧用户头像 -->
    <div class="quit">
      <Dropdown>
        <a href="javascript:void(0)">
          <img :src="image" :alt="username">
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>Home</DropdownItem>
         <DropdownItem>changeInfors</DropdownItem>
         <DropdownItem>signout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import storage from "../model/storage.js";
export default {
  data() {
    return {
      visible: false,
      username: "",
      image: require("../assets/li.jpg")
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    }
  },
  mounted() {
    // 获取用户头像
  }
};
</script>
<style scoped>
.quit {
  float: right;
}
.quit img {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px 20px;
}
.container-fluid {
  margin: 0;
  padding: 0;
  height: 80px;
  background-color: rgb(33, 33, 126);
}
.sellerheader-img {
  float: right;
  width: 30%;
}
.sellerheader-img img {
  margin: 2% 2%;
}
</style>