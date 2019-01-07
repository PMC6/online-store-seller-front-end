<!-- 头部通栏-->
<template>
  <div class="container-fluid" style=" ">
    <!-- <div class="container" style=" height:100%   "> -->
    <!-- logo位置 -->
    <div class="logo" style=" float:left;">
      <img src="../assets/logo.png">
    </div>
    <!-- 右侧用户头像 -->
    <div class="quit">
      <Dropdown @on-hover-click="test" trigger="click" >
        <a href="javascript:void(0)">
          <img :src="image" :alt="username">
        </a>
        <DropdownMenu slot="list">
          <DropdownItem  @click.native="toHome()">
            <button>Home</button>
          </DropdownItem>
          <!--<DropdownItem  @click.native="toAdvertisement()">-->
            <!--<button>Advertisement</button>-->
          <!--</DropdownItem>-->
          <DropdownItem @click.native="changepassword()">
            <button>changepassword</button>
          </DropdownItem>
          <DropdownItem @click.native="logout()">
            <button>logout</button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
  import storage from "../model/storage.js"

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
    logout() {
      if (storage.get("logStatus")){
        this.axios
          .get("/logout")
          .then(res => {})
          .catch(err => {
            this.$router.go(0);
          });
      }else this.loginPrompt();
    },
    // toAdvertisement(){
    //   if (storage.get("logStatus") && storage.get("role") === "seller"){
    //     this.$parent.advertiseshow=true;
    //     this.$parent.mainshow=false;
    //     this.$parent.changepasswordshow=false;
    //   }else if (!storage.get("logStatus")){
    //     this.loginPrompt();
    //   }else this.$Message.error("Please continue register");
    // },
    toHome(){
      if (storage.get("logStatus")){
        this.$parent.mainshow=true;
        this.$parent.advertiseshow=false;
        this.$parent.changepasswordshow=false;
      }else this.loginPrompt();
    },
    changepassword(){
      if (storage.get("logStatus")) {
        this.$parent.changepasswordshow=true;
        this.$parent.mainshow=false;
        this.$parent.advertiseshow=false;
      }else this.loginPrompt();
    },
    loginPrompt(){
      this.$Message.error("Please login");
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
</style>
