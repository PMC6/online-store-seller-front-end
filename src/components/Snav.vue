<template>
  <div class="container-fluid " style=" display:flex; height:750px;">
<<<<<<< HEAD
    <!--  -->
=======
>>>>>>> e8923f1bfd05f5b20f3c44f86be7bb685b3a4f26
    <ul class="nav navbar-left navbar-default navSelf col-md-2">
      <li @click="shopRouter">
        <router-link :to="myShopLink" name="sanv">MyShop</router-link>
      </li>
      <li>
        <router-link to="/managemain">Manage Products</router-link>
      </li>
      <li>
        <router-link to="/manageadvertise">Manage Advertisement</router-link>
      </li>
      <li>
        <router-link to>Manage Order</router-link>
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
    <div class="col-md-10" style="margin-left:15px; background-color:rgba(255,255,255,0.9);">
      <router-view ></router-view>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

li a:hover,
li a:focus ,
li a:visited,
li a:active
{
  text-decoration: none;
  background-color: rgba(125, 140, 218, 0.9);
}
li {
  display: block;
  width: 100%;
  background:transparent;
  height: 50px;
  /* border: 1px solid rgb(28, 30, 139,0.5); */
  /* border-radius: 5%; */
}
li a {
  display: block;
  color: #ccc;
  text-align: center;
  width: 200px;
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
      myShopLink: '/sellermain',
      name:"test",
      // shopRouter:"",
    }
  },
  methods:{
    shopRouter(){
    // alert("hello");
    // alert(this.name);

    axios.get('/seller/shop/info')
      .then(response=>{
        this.myShopLink="/shopInfo";
      }).catch(err=>{
        this.myShopLink="/sellermain";
    })
  }
  
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
