<template>
<!-- 商品细节展示 -->
  <div>
    <div class="modal-header">
      <h4 class="modal-title" id="gridSystemModalLabel">Products Of Details</h4>
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
                <img :src="image" alt="product image">
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
                    >
                  </div>
                </div>

                <div class="form-group row">
                  <label  class="col-sm-3 col-form-label">Number</label>
                  <div class="col-sm-9">
                    <input
                            type="text"
                            class="form-control"
                            id="inputLocation"
                            placeholder
                            v-model="number"
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
                    ></textarea>
                  </div>
                </div>

<div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">HomePage</label>
            <div class="col-sm-9 col-xs-9">
              <select class="form-control" id="homePage" v-model="homePage">
                <option :value="true">True</option>
                <option :value="false">False</option>
              </select>
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
    margin: 30% 0 5% 25%;
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
import axios from 'axios'
import Bus from './bus.js'
import Picture from './Picture.vue'

export default {
  name: "ProductDisplay",
  components:{Picture},

    data() {
        return {
            id:'',
            name:'',
            price:'',
            category:'',
            categoryName:'',
            info:'',
            number:'',
            userId:'',
            homePage:true,
            createTime:'',
            image: require("../assets/预设头像.png"),
          selected:'',
        }
    },

    mounted() {
        let self = this;
        Bus.$on('msg',(e) => {
            self.message = e;
            this.id=e.id;this.name=e.name;this.price=e.price;this.categoryName=e.category.name;
            this.info=e.info;this.number=e.number;this.homePage=e.homePage;this.category=e.category;
            this.image=e.image;
        })
    },

  methods: {


changeImage(e) {
   let file = e.target.files[0];
   let reader = new FileReader();
   let that = this;
 reader.readAsDataURL(file);
 reader.onload = function(e) {
   that.image = this.result;
 };
},
back(){
 this.$parent.displayshow=false;
 this.$parent.detailshow=true;
},

update(){
         axios.put('/seller/product/modify', {
           id:this.id,
           name: this.name,
           price: this.price,
           number: this.number,
           info: this.info,
           homePage: this.homePage,
           image: this.image,
           category:this.category
         }).then((response) => {
           Bus.$emit('updateEvent', 'success');
           console.log(response);
           this.$Message.success("update success");

         }).catch((err) => {
           alert(JSON.stringify(err.message.data));

         }).finally(()=>{
           this.$parent.displayshow=false;
           this.$parent.detailshow=true;
         })
 },


}


}
</script>
