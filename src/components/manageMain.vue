<template>
  <div class="navbar-right" style>
    <pdetail v-show="detailshow" cate="hide"></pdetail>
    <Lynmodel v-show="addshow"></Lynmodel>
    <productdisplay v-show="displayshow"></productdisplay>
  </div>
</template>
<style scoped>
.navbar-right {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  border: 1px solid rgb(171, 171, 179);
  border-radius: 1%;
}
.manage-bar {
  clear: both;
  position: absolute;
  top: 12%;
}
</style>
<script>
import Lynmodal from "./lynmodal.vue";
import productdisplay from "./productDisplay";
import pDetail from "./productDetail";
export default {
  data(){
    return {
      detailshow:true,
      addshow:false,
      displayshow:false
    }
  },
  components: {
    productdisplay: productdisplay,
    pdetail: pDetail,
    Lynmodel:Lynmodal
  }
};
</script>

