<template>
  <!-- seller -->
  <div class="div1">
    <sellerheader class="seller-header"></sellerheader>
    <div style="clear:both; height:80px;"></div>
    <vmain v-show='mainshow'></vmain>
    <!--店铺广告页 -->
    <div v-show="advertiseshow">
      <div class="shopinfors">
        <Avatar :src="shopimage" size="large" style="margin:50px;"/><br/>
        <span>shopname:{{ shopname }}</span>
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
import Bus from "./bus";
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
  }
};
</script>
<style scoped>
.shopinfors{
  width:200px;
  height:200px;
  background-color: rgba(124, 89, 128, 0.3);
  position: fixed;
  left:15px;
  
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


