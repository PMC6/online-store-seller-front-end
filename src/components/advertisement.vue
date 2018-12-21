<template>
  <!-- 广告管理页 -->
  <div class="shopAd">
    <!--
        <div class="shopinfors">

        </div>
        <advertiseheader></advertiseheader>
        <div>
        <router-view></router-view>
      </div>
      -->
    <Tabs value="name1" capture-focus>
        <TabPane label="homepage" name="name1">
          <advertisehomepage></advertisehomepage>          
        </TabPane>
        <TabPane label="allproducts" name="name2">
          <allproducts></allproducts>
        </TabPane>
    </Tabs>


  </div>
</template>
<style scoped>

.shopAd {
  width: 100%;
  margin:0;
  float:right;
  margin-right: 50px;
  height: 2000px;
  z-index: 0;
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

<script>
import advertiseheader from "./AdvertiseHeader";
import carousel from "./Carousel";
import products from "./Products";
import allproducts from "./Allproducts";
import advertisehomepage from "./AdvertiseHomepage";
export default {
  data() {
    return {
      value2: 0
    };
  },
  components: {
    advertiseheader,
    carousel,
    products,
    allproducts,
    advertisehomepage
  }
};
</script>