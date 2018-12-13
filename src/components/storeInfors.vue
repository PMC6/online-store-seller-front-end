<template>
  <div class="seller-infos">

    <!--Image-->
    <div class="input-image">
      <img :src="image" alt="your image">
      <br>
      <input
        type="file"
        name="image"
        @change="changeImage($event)"
        accept="image/png, image/jpeg, image/gif, image/jpg"
      >
    </div>

    <!--ShopName-->
    <form class="seller-infos-table">

      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-3 col-form-label">ShopName</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="inputEmail3" placeholder v-model="shopname" required>
        </div>
      </div>

      <!--Telephone-->
      <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Telephone</label>
        <div class="col-sm-9">
          <input type="text" class="form-control"  placeholder v-model="telephone" pattern="^[1][0-9]{10}">
        </div>
      </div>

      <!--Email-->
      <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Email</label>
        <div class="col-sm-9">
          <input type="text" class="form-control"  placeholder v-model="email" pattern="">
        </div>
      </div>

      <!--Info-->
      <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Info</label>
        <div class="col-sm-9">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            v-model="info"
          ></textarea>
        </div>
      </div>


      <!--Button-->
      <div class="form-group row">
        <div class="col-sm-5">
          <button
            type="submit"
            class="btn btn-primary btn-seller"
            @click="toSecondstep"
          >back</button>
        </div>
        <div class="col-sm-5">
          <button type="submit" class="btn btn-primary btn-seller" @click="tofourstep">Save</button>
        </div>
      </div>

    </form>
  </div>
</template>
<script>
import axios from "axios";
import Bus from './bus.js'
import storage from '../model/storage.js'

export default {
  data() {
    return {

        phone:'',
        pernoalphone:'',
        sellername:'',
        email:'',
        pernoalemail:'',
        telephone:'',
        shopname: '',
        info: '',
        image:require('../assets/预设头像.png'),
        category: '',
        account: '',
        saveok: false,


    };
  },
  mounted(){

  },
   methods: {

    toSecondstep(){
      this.$parent.ruleshow=false;
       this.$parent.sellershow = true;
        this.$parent.storeshow = false;
        this.$parent.completeshow=false;
        this.$parent.current=1;


        let self = this;
        Bus.$on('msg', (e) => {
            self.message = e;
            this.pernoalemail=e.email
            this.pernoalphone=e.telphone
            this.sellername=e.sellername})




    },
    tofourstep() {
        this.$parent.ruleshow=false;
        this.$parent.sellershow = false;
        this.$parent.storeshow = false;
        this.$parent.completeshow=true;
        this.$parent.current = 3;

      console.log(this.image);

        axios.post('/customer/request', {
            name:this.shopname,
            image:this.image,
            email:this.email,
            info:this.info,
            telephone:this.telephone,

        }).then((response) => {

            console.log(this.shopname)
            console.log(this.image)
            console.log(this.email)
            console.log(this.info)
            console.log(this.telphone)


        }).catch((err) => {
            console.error(err.response)
        })

    },
     changeImage(e) {
       let file = e.target.files[0];
       let reader = new FileReader();
       let that = this;
       reader.readAsDataURL(file);

       reader.onload = function(e) {
         if (this.result.length < 25600) {
           that.image = this.result;
         }else {
           alert("The size of img must small than 25k");
           that.image = require('../assets/预设头像.png');
         }

       };
     },


  },




};
</script>
<style scoped>
.seller-infos {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
}
.input-image {
  width: 40%;
  height: 100%;
  float: left;
}
.input-image img {
  margin: 30% 0 5% 25%;
}
.input-image input {
  margin-left: 25%;
}

.seller-infos-table {
  float: right;
  /* margin-top: 5%; */
  margin-right: 20px;
  margin-bottom: 20%;
}
.btn-seller {
  width: 65px;
  height: 40px;
}
</style>
