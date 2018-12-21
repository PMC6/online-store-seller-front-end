<template>
<!-- 申请商品广告 -->
  <div>
    <div class="modal-header">
      <h4 class="modal-title" id="gridSystemModalLabel">Apply Advertisement</h4>
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
                <img :src="adImg" alt="advertise image">
                <br>
                <input
                  type="file"
                  name="image"
                  @change="changeImage($event)"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                >
              </div>
              <form class="seller-infos-table">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Name</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputname"
                      placeholder
                      v-model="name"
                      readonly="true"
                    >
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Category</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputCategory"
                      v-model="categoryName"
                      readonly="true"
                      placeholder
                    >
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Price</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputIDcard"
                      v-model="price"
                      placeholder
                      readonly="true"
                    >
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Number</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="inputLocation"
                      placeholder
                      v-model="number"
                      readonly="true"
                    >
                  </div>
                </div>
                <!-- 商品id -->
                <!-- <div class="form-group row">
                  <label class="col-sm-3 col-form-label">ID</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" placeholder v-model="id">
                  </div>
                </div> -->
                <!-- 商品广告费 -->
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Fee</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" placeholder v-model="fee">
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

export default {
  name: "applyadvertise",

  data() {
    return {
      id: "",
      name: "",
      price: "",
      category: "",
      categoryName: "",
      adImg:require("../assets/预设头像.png"),
      number: "",
      userId: "",
      createTime: "",
      selected: "",
      fee:''
    };
  },

  mounted() {
    let self = this;
    Bus.$on("msg", e => {
      self.message = e;

      this.id = e.id;
      this.name = e.name;
      this.price = e.price;
      this.categoryName = e.category.name;
      this.info = e.info;
      this.number = e.number;
      this.homePage = e.homePage;
      this.category = e.category;
      this.phone = e.telphone;
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
        that.adImg = this.result;
      };
    },
    back() {
        // 返回管理广告列表
      this.$parent.applyshow = false;
      this.$parent.tableshow = true;
    },

    update() {
    //   申请广告位
      axios
        .post("/seller/product/advertisement", {
          id:this.id,
          image: this.adImg,
          fee:this.fee
        })
        .then(response => {
            alert("save success");
            console.log(response);
            this.$parent.tableshow=true;
            this.$parent.applyshow=false;
        })
        .catch(err => {
          alert(JSON.stringify(err.message.data));
        });
    }
  }
};
</script>