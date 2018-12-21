<template>
<!-- 管理商品 -->
<div class="navbar-right" style>
    <!-- 商品列表 -->
   <producttable v-show="tableshow"></producttable>
   <!-- 申请店铺 -->
   <applyadvertise v-show="applyshow"></applyadvertise>
  </div>
    
</template>
<script>
import producttable from './productTable'
import applyadvertise from './ApplyAdvertise'
export default {
    data(){
        return {
            tableshow:true,
            applyshow:false
        }
    },
    components:{
        producttable,
        applyadvertise
    }
}
</script>
<style scoped>
.navbar-right {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  border: 1px solid rgb(171, 171, 179);
  border-radius: 1%;
}
</style>


