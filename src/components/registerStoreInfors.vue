<template>
  <div class="seller-infos">
    <!--Image-->
    <div class="input-image">
      <img :src="image" alt="your image">
      <br>
      <Picture></Picture>
    </div>

    <!--ShopName-->
    <div class="seller-infos-table">
      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-3 col-form-label">ShopName</label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            id="inputEmail3"
            placeholder
            v-model="shopname"
            required
          >
        </div>
      </div>

      <!--Telephone-->
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Telephone</label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            placeholder
            v-model="telephone"
          >
        </div>
      </div>

      <!--Telephone-->
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Alipay</label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            placeholder
            v-model="alipay"
          >
        </div>
      </div>

      <!--Email-->
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Email</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder v-model="email">
        </div>
      </div>

      <!--Info-->
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Info</label>
        <div class="col-sm-9">
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" v-model="info"></textarea>
        </div>
      </div>

      <!--Button-->
      <div class="form-group row">
        <div class="col-sm-5">
          <button type="submit" class="btn btn-primary btn-seller" @click="toSecondstep">back</button>
        </div>
        <div class="col-sm-5">
          <button type="submit" class="btn btn-primary btn-seller" @click="tofourstep">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Bus from "./bus.js";
import storage from "../model/storage.js";
import Picture from "./Picture.vue"

export default {
  data() {
    return {
      phone: "",
      pernoalphone: "",
      sellername: "",
      email: "",
      pernoalemail: "",
      telephone: "",
      shopname: "",
      info: "",
      image: require("../assets/预设头像.png"),
      category: "",
      account: "",
      saveok: false,
      alipay:"",
    };
  },
  components:{Picture},
  mounted() {},
  methods: {
    toSecondstep() {
      this.$parent.ruleshow = false;
      this.$parent.sellershow = true;
      this.$parent.storeshow = false;
      this.$parent.completeshow = false;
      this.$parent.current = 1;

      let self = this;
      Bus.$on("msg", e => {
        self.message = e;
        this.pernoalemail = e.email;
        this.pernoalphone = e.telphone;
        this.sellername = e.sellername;
      });
    },
    tofourstep() {
      if (this.shopname === ""){
        this.$Message.error("Please check shop name");
      }else if (this.image === require("../assets/预设头像.png")){
        this.$Message.error("Please check shop image");
      } else if (!this.telephone.match("^[0-9]{5,15}")){
        this.$Message.error("Please check your shop's telephone");
      }else if (this.alipay === ""){
        this.$Message.error("Please check your shop's alipay")
      } else if (!this.email.match("^[0-9a-zA-Z]{1,20}@[0-9a-zA-Z.]{1,20}")){
        this.$Message.error("Please check your shop's email");
      } else if (this.info === ""){
        this.$Message.error("Please check your shop's info")
      } else

      axios
        .post("/customer/request", {
          name: this.shopname,
          image: this.image,
          email: this.email,
          info: this.info,
          telephone: this.telephone,
          alipay:this.alipay
        })
        .then(response => {
          this.$parent.ruleshow = false;
          this.$parent.sellershow = false;
          this.$parent.storeshow = false;
          this.$parent.completeshow = true;
          this.$parent.current = 3;
          console.log(this.shopname);
          console.log(this.image);
          console.log(this.email);
          console.log(this.info);
          console.log(this.telphone);
        })
        .catch(err => {
          this.$Message.error("shop name is exist");
        });
    }
  }
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
  width:150px;
  height:100px;
}
.input-image input {
  margin-left: 25%;
}

.seller-infos-table {
  float: right;
  margin-top: 5%;
  margin-right: 20px;
  margin-bottom: 20%;
}
.btn-seller {
  width: 65px;
  height: 40px;
}
</style>
