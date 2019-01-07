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
                <img :src="image" alt="advertise image">
                <br>
                <Picture></Picture>
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
import Picture from './Picture.vue';

export default {
  name: "applyadvertise",
  components:{Picture},
  data() {
    return {
      id: "",
      name: "",
      price: "",
      category: "",
      categoryName: "",
      image:require("../assets/预设头像.png"),
      number: "",
      userId: "",
      createTime: "",
      selected: "",
      fee:'',
      info:''
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
      this.$parent.applyshow = false;
      this.$parent.tableshow = true;
    },

    update() {
      this.$Modal.confirm({
        title:'Are you sure to apply the product advertisement?',
        onOk:()=>{
          //   申请广告位
          if (!this.fee.match("^[0-9]{1,10}")){
            this.$Message.error("Please enter fee");
          }else {
            axios
              .post("/seller/product/advertisement", {
                id:this.id,
                image: this.image,
                fee:this.fee
              })
              .then(response => {
                this.$Message.success("summit success");
                this.$parent.tableshow=true;
                this.$parent.applyshow=false;
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
