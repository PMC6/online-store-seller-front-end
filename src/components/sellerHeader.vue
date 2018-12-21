<<<<<<< HEAD
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
      <Dropdown @on-hover-click="test" trigger="click" @on-clickoutside="test1">
        <a href="javascript:void(0)">
          <img :src="image" :alt="username">
        </a>
        <DropdownMenu slot="list">
          <DropdownItem :name="home"><button @click="toHome">Home</button></DropdownItem>
          <DropdownItem :name="advertisement">
            <button @click="toAdvertisement">Advertisement</button>
          </DropdownItem>
          <DropdownItem :name="personinformation">personal information</DropdownItem>
          <DropdownItem :name="changepassword">
            <!-- <router-link to="changepassword">changepassword</router-link> -->
            <button @click="changepassword">changepassword</button>
          </DropdownItem>
          <DropdownItem :name="signout">
            <a @click="signout">signout</a>
          </DropdownItem>
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
      image: require("../assets/li.jpg"),
      name: ""
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },

    test() {},
    signout() {
      axios
        .get("/user/login")
        .then(res => {})
        .catch(err => {});
    },
    toAdvertisement(){
      this.$parent.advertiseshow=true;
      this.$parent.mainshow=false;
      this.$parent.changepasswordshow=false;
    },
    toHome(){
      this.$parent.mainshow=true;
      this.$parent.advertiseshow=false;
      this.$parent.changepasswordshow=false;
    },
    changepassword(){
      this.$parent.changepasswordshow=true;
      this.$parent.mainshow=false;
      this.$parent.advertiseshow=false;

    }
  },
  mounted() {
    // 获取用户头像
  }
};
</script>
<style scoped>
button{
  background-color: #fff;
  border:none;
  color:#666;
  width:100px;
}
a {
  color: #666;
}
a:hover {
  text-decoration: none;
}
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
=======
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
>>>>>>> e8923f1bfd05f5b20f3c44f86be7bb685b3a4f26
</style>