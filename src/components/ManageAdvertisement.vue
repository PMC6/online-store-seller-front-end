<template>
<!-- 管理商品 -->
<div class="navbar-right" style>
    <!-- 商品列表 -->
   <producttable v-show="tableshow"></producttable>
   <!-- 申请店铺 -->
   <applyadvertise v-show="applyshow"></applyadvertise>
   <shopapply v-show="shopapplyshow"></shopapply>
  </div>

</template>
<script>
import producttable from './ADApplyMain'
import applyadvertise from './ApplyAdvertise'
import shopapply from './shopApplyAd'
export default {
    data(){
        return {
            tableshow:true,
            applyshow:false,
            shopapplyshow:false
        }
    },
    components:{
        producttable,
        applyadvertise,
        shopapply
    }
}
</script>
<style scoped>
.navbar-right {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  /*border: 1px solid rgb(171, 171, 179);*/
  /*border-radius: 1%;*/
}
</style>


