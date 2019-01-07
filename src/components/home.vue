<template>
  <!-- seller -->
  <div class="div1">
    <sellerheader class="seller-header"></sellerheader>
    <div style="clear:both; height:80px;"></div>
    <vmain v-show='mainshow'></vmain>
    <!--店铺广告页 -->
    <div v-show="advertiseshow">
      <div class="shopinfors">
        <!--<Avatar :src="shopimage" size="large" style="margin:50px;"/><br/>-->
        <img :src="shopimage" style="margin: 10px auto;width:100px;height:100px; display:block" class="img-circle"/>
        <span style="margin:10px; text-align:center; display:block; max-width:94px; overflow:hidden;" ><Icon type="md-appstore" />{{ shopname }}</span>
      </div>

      <div class="row">
        <advertise></advertise>
      </div>
    </div>
    <changepassword v-show="changepasswordshow"></changepassword>
</div>


 </template>
<script >
import sellerheader from "./sellerHeader";
import vmain from "./maincontent";
import advertise from "./advertisement";
import storage from '../model/storage';
import changepassword from './changePassword';
export default {
  data() {
    return {
      loginshow: true,
      navshow: false,
      username: "",
      shopimage:require('../assets/预设头像.png'),
      shopname:'',
      mainshow:true,
      advertiseshow:false,
      changepasswordshow:false
    };
  },
  components: {
    sellerheader: sellerheader,
    advertise: advertise,
    vmain,
    changepassword
  },
  mounted(){
    //获取店铺头像、店铺名称、
    this.shopimage=storage.get("shopImage");
    this.shopname=storage.get("shopName");
  }
};
</script>
<style scoped>
.shopinfors{
  width:150px;
  height:150px;
  /* background-color: rgba(124, 89, 128, 0.3); */
  position: fixed;
  left:15px;
  border: 3px solid rgba(29, 9, 9, 0.5);
  border-top:0;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
}
.div1 {
  width:100%;
  background-image: url(../assets/bgi.png);
  background-size:cover;
}
.seller-header {
  position: fixed;
  top: 0;
  z-index: 1000;
}
.row{
  width:78%;
  float:right;
  margin-right: 50px;
}
</style>


