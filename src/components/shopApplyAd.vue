<template>
<!-- 申请商品广告 -->
  <div>
    <div class="modal-header">
      <h4 class="modal-title" id="gridSystemModalLabel">Apply Shop Advertisement</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="back">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="container-fluid">
        <form class="form-horizontal">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="input-image">
                <!-- 广告图片 -->
                <img :src="image" alt="advertise image">
                <br>
                <Picture></Picture>
              </div>
              <form class="seller-infos-table">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">ShopName</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputshopName"
                      placeholder
                      v-model="shopname"
                      readonly="true"
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">SellerName</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputSellerName"
                      placeholder
                      v-model="sellername"
                      readonly="true"
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Email</label>
                  <div class="col-sm-9">
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail"
                      placeholder
                      v-model="email"
                      readonly="true"
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Telphone</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputTelephone"
                      v-model="tel"
                      placeholder
                      readonly="true"
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Alipay</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputAlipay"
                      v-model="alipay"
                      placeholder
                      readonly="true"
                    >
                  </div>
                </div>


                <div class="form-group row">
                  <label  class="col-sm-3 col-form-label">Info</label>
                  <div class="col-sm-9">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="2"
                      v-model="info"
                      readonly="true"
                    ></textarea>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Fee</label>
                  <div class="col-sm-9">
                    <input type="number" class="form-control" placeholder="0" v-model="fee">
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-5">
                    <button type="button" class="btn btn-primary btn-seller" @click="back">cancel</button>
                  </div>
                  <div class="col-sm-5">
                    <button type="button" class="btn btn-primary btn-seller" @click="update">save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-dialog {
  max-width: 80%;
}
.input-image {
  width: 40%;
  height: 100%;
  float: left;
}
.input-image img {
  margin: 20% 0 5% 20%;
  width: 300px;
  height: 200px;
}
.input-image input {
  margin-left: 25%;
}
.seller-infos-table {
  float: right;
  /* margin-top: 5%; */
  margin-right: 100px;
  margin-bottom: 20%;
}
</style>


<script>
import axios from "axios";
import Bus from "./bus.js";
import Picture from "./Picture.vue"

export default {
  name: "applyadvertise",
  components:{Picture},
  data() {
    return {
      id: "",
      shopname: "",
      sellername:'',
      alipay: "",
      tel: "",
      image:require("../assets/预设头像.png"),
      fee:'',
      info:'',
      email:''
    };
  },

  mounted() {
    let self = this;

    axios.get('/seller/shop/info')
    .then(response=>{
      this.shopname = response.data.data.name;
      this.sellername = response.data.data.user.username;
      this.tel = response.data.data.user.telephone;
      this.info = response.data.data.info;
      this.image = response.data.data.image;
      this.email=response.data.data.user.email;
      this.alipay=response.data.data.alipay;
    }).catch(err=>{

    })

    Bus.$on("msg", e => {
      self.message = e;

      this.id = e.id;
      this.name = e.name;
      this.price = e.price;
      this.categoryName = e.category.name;
      this.info = e.info;
      this.number = e.number;
      this.image = e.image;
      this.category = e.category;

    });

  },
  methods: {
    changeImage(e) {
        //图片
      let file = e.target.files[0];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.image = this.result;
      };
    },
    back() {
        // 返回管理广告列表
      this.$parent.shopapplyshow = false;
      this.$parent.applyshow=false;
      this.$parent.tableshow = true;
    },

    update() {
      this.$Modal.confirm({
        title:'Are you sure to apply shop advertisement?',
        onOk:()=>{
          //   申请广告位
          if (!this.fee.match("^[0-9]{1,10}")){
            this.$Message.error("Please enter fee");
          }else {
            axios
              .post("/seller/shop/advertisement", {
                image: this.image,
                fee:this.fee
              })
              .then(response => {
                this.$Message.success("summit success");
                this.$parent.tableshow=true;
                this.$parent.applyshow=false;
                this.$parent.shopapplyshow = false;
              })
              .catch(err => {
                this.$Message.error("summit error");
                console.log(err);
              });
          }
        }
      })
    }
  }
};
</script>
