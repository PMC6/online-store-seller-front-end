<template>
  <div class="navbar-right shop-infors">
    <div class="shop-infos-table">
      <form>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label"></label>
          <div class="col-sm-7">
            <!--<input type="text" class="form-control" placeholder v-model="storeImg">-->
            <img :src="image" align="center" width="100" height="90">
          </div>
        </div>
        <!--shop name-->
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">shop name</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" placeholder v-model="storename">
          </div>
        </div>
        <!--seller name-->
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">seller name</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" placeholder v-model="sellername">
          </div>
        </div>
        <!--Telphone-->
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Telphone</label>
          <div class="col-sm-7">
            <input
              type="text"
              class="form-control"
              id="inputTel"
              placeholder
              v-model="tel"
              pattern="^[1][0-9]{10}"
            >
          </div>
        </div>

        
        <!--Info-->
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Info</label>
          <div class="col-sm-7">
            <textarea class="form-control" rows="2" v-model="description"></textarea>
          </div>
        </div>
        <!--Button-->
        <div class="form-group row">
          <div class="col-sm-5">
            <button type="submit" class="btn btn-primary btn-seller" @click="update">update</button>
          </div>
          <div class="col-sm-5">
            <button type="submit" class="btn btn-primary btn-seller" @click="saveUpdate">save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>

.navbar-right {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 1%;
}
.shop-infos-table {
  width: 80%;
  margin: 5% auto;
}
.btn-seller {
  text-align: center;
}
</style>
<script>
import axios from 'axios';


export default {
  data() {
    return {
      storename: "",
      category: "",
      account: "",
      description: "",
      image: require("../assets/预设头像.png"),
      sellername: "",
      IDcard: "",
      tel: "",
      address: ""
    };
  },
  methods: {
    update() {
      //点击按钮，使部分元件可编辑
    },
    saveUpdate() {
      //点击按钮，保存修改的店铺信息
    }
  },
  mounted(){
    axios.get('/seller/shop/info')
    .then(response=>{
      this.storename = response.data.data.name;
      this.sellername = response.data.data.user.username;
      this.tel = response.data.data.user.telephone;
      this.description = response.data.data.info;
      this.image = response.data.data.image;
      // this.category = response.data.data.shop.category;
    }).catch(err=>{
      this.$router.push("/")
    })
  }
};
</script>


