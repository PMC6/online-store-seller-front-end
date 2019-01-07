<template>
  <div class="container-fluid snav" style=" display:flex; height:750px; ">
    <!--  -->
    <ul class="nav navbar-left navbar-default navSelf col-md-2 col-sm-2 col-xs-2">
      <li>
        <router-link :to="myShopLink" name="sanv">My Shop</router-link>
      </li>
      <li @click="linkRouter">
        <router-link :to="manageProductLink">Manage Products</router-link>
      </li>
      <li @click="linkRouter">
        <router-link :to="manageAdvertisementLink">Manage Advertisement</router-link>
      </li>
      <li @click="linkRouter">
        <router-link :to="manageordersLink">Manage Order</router-link>
      </li>

      <li @click="linkRouter">
        <router-link :to="saleshistoryLink">Sales History</router-link>
      </li>
      <li @click="linkRouter">
        <router-link :to="shopincomeLink">Shop Income</router-link>
      </li>
    </ul>
    <div class="col-md-10 col-sm-10 col-xs-10" style="margin-left:15px; background-color:rgba(255,255,255,1);">
      <router-view ></router-view>
    </div>
  </div>
</template>
<style scoped>

* {
  margin: 0;
  padding: 0;
}
.navbar-left > li a:hover,
.navbar-left > li a:focus ,
.navbar-left > li a:visited,
.navbar-left > li a:active
{
  text-decoration: none;
  background-color: rgba(125, 140, 218, 0.9);
}
.navbar-left > li {
  display: block;
  width: 100%;
  background:transparent;
  height: 50px;
}
.navbar-left > li a {
  display: block;
  color: #ccc;
  text-align: center;
  width:100%;
  height: 100%;
  line-height: 50px;
}
.navbar-left {
  height:20%;
}
</style>
<script>
import axios from 'axios'
import storage from '../model/storage.js'
export default {
  data() {
    return {
      myShopLink: '',
      name:"test",
      manageProductLink:'',
      manageAdvertisementLink:'',
      manageordersLink:'',
      saleshistoryLink:'',
      shopincomeLink:''
    }
  },
  mounted(){
    axios.get('/seller/shop/info')
      .then(()=>{
        this.myShopLink="/shopInfo";
      }).catch(()=>{
      this.myShopLink="/sellermain";
    });
    if (storage.get("role") === "seller"){
      this.manageProductLink = "/managemain";
      this.manageAdvertisementLink = "/manageadvertise";
      this.manageordersLink="/manageorders";
      this.saleshistoryLink='/saleshistory';
      this.shopincomeLink="/shopincome"
    }
  },
  methods:{
    linkRouter(){
      if (storage.get("role") !== "seller"){
        this.$Message.error("Sorry, you aren't seller")
      }
    }

  }
};
</script>
