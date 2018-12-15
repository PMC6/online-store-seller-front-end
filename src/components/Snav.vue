<template>
  <div class="container-fluid " style=" display:flex; height:800px;">
    <ul class="nav navbar-left navbar-default navSelf col-md-2">
      <li>
        <router-link to="/shopInfo" name="sellerinfors">My Shop</router-link>
      </li>
      <li>
        <router-link to="/managemain">Manage Products</router-link>
      </li>
      <li>
        <router-link to>Manage Order</router-link>
      </li>
      <li>
        <router-link to>Manage Advertisement</router-link>
      </li>
      <li>
        <router-link to>Sales History</router-link>
      </li>
      <li>
        <router-link to>Shop Income</router-link>
      </li>
      <li>
        <router-link to>Evaluation View</router-link>
      </li>
      
    </ul>
    <div class="col-md-10" style="margin-left:15px;">
      <router-view></router-view>
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
  background:rgba(255,255,255,0.1);
  height: 50px;
  /* border: 1px solid rgb(28, 30, 139,0.5); */
  /* border-radius: 5%; */
}
.navbar-left > li a {
  display: block;
  color: #ccc;
  text-align: center;
  width: 100%;
  height: 100%;
  line-height: 50px;
}
.navbar-left {
  /* margin-top: 10px; */
  height:20%;
}
</style>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      myShopLink: '/',
    }
  },
  shopRouter(){
    alert("hello");
    axios.get('/seller/shop/info')
      .then(response=>{
        this.myShopLink="/shopInfo";
      }).catch(err=>{
        this.myShopLink="/";
    })
  }
  // mounted(){
  //   axios.post('/api/user/login',{
  //     username:'fenlan',
  //     password:'fenlan'
  //   }).then(response=>{
  //     console.log(response);
  //   }).catch(error=>{
  //     console.log(error);
  //   })
  // }
};
</script>
