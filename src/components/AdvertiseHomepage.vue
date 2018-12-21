<template>
  <!-- 广告中的首页 -->
  <div>
    <!-- 轮番图 -->
    <carousel></carousel>

    <!-- 热销宝贝 -->
    <div class="div3">
      <span>热销宝贝</span>
    </div>
      <!-- 商品列 -->
      <div class="productdiv">
        <products></products>
      </div>
    

    <!-- 新品推荐 -->
    <div class="div3">
      <span>新品推荐</span>
    </div>
      <!-- 商品列 -->
   <div class="productdiv">
        <products></products>
      </div>
    

    <div style="height:100px;"></div>
  </div>
</template>
<script>
import carousel from "./Carousel";
import products from "./Products";
export default {
  components: {
    carousel,
    products
  }
};
</script>
<style scoped>
.productdiv{
  width:100%;
  height:400px;
  
}
.div3 {
  width: 100%;
  height: 94px;
  background-color: #9999ff;
  margin: 20px auto;
  text-align: center;
  font-size: 60px;
  color: #fff;
}
</style>


