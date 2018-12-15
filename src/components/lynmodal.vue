<template>
  <div class="btn-add">
    <!--弹出窗口 添加资源-->
    <!-- <div class="modal fade" id="addSource" role="dialog" aria-labelledby="gridSystemModalLabel">
      <div class="modal-dialog" role="document">
    <div class="modal-content">-->
    <div class="modal-header">
      <h4 class="modal-title" id="gridSystemModalLabel">Add Products</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="back">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="container-fluid">
        <form class="form-horizontal">
          <div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">Name:</label>
            <div class="col-sm-8 col-xs-8">
              <input class="form-control input-sm duiqi" v-model="name">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">Price:</label>
            <div class="col-sm-8 col-xs-8">
              <input class="form-control input-sm duiqi" v-model="price">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">category:</label>
            <div class="col-sm-8 col-xs-8">
              <!--<input class="form-control input-sm duiqi" v-model="category" readonly="true">-->
              <select class="form-control" id="categorySelect" v-model="category">
                <option>TV& Home Theater</option>
                <option>Computers & Tablets</option>
                <option>Cell Phones</option>
                <option>Cameras & Camcorders</option>
                <option>Audio</option>
                <option >Car Electronics & GPS</option>
                <option >Video, Games, Movies & Music</option>
                <option >Health, Fitness & Sports</option>
                <option >Home & Office</option>
              </select>
            </div>


          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">Num:</label>
            <div class="col-sm-8 col-xs-8">
              <input class="form-control input-sm duiqi" v-model="number">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">Info:</label>
            <div class="col-sm-8 col-xs-8">
              <input class="form-control input-sm duiqi" v-model="info">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">HomePageShow:</label>
            <div class="col-sm-8 col-xs-8">
              <!--<input class="form-control input-sm duiqi" v-model="homepage">-->
              <select class="form-control" id="homePage" v-model="homepage">
                <option>True</option>
                <option>False</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-xs-3 control-label">Image:</label>
            <div class="col-sm-8 col-xs-8">
              <input
                type="file"
                name="image"
                @change="changeImage($event)"
                accept="image/png, image/jpeg, image/gif, image/jpg"
              >
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-xs btn-white btn-c"
        data-dismiss="modal"
        @click="back"
      >Cancel</button>
      <button type="button" class="btn btn-xs btn-green btn-c" @click="save">Save</button>
    </div>
  </div>
</template>
<script>
import Bus from "./bus.js";
import axios from 'axios';


export default {
  name: "LynModal",
  data() {
    return {
      name: "",
      price: "",
      number: "",
      info: "",
      homepage: "",
      image: "",
      category: {}
    };
  },
  methods: {
    mounted(){

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
        }
      };
    },
    back() {

      this.$parent.detailshow = true;
      this.$parent.addshow = false;
    },
    add() {
      Bus.$emit("txt", {
        name: this.name,
        price: this.price,
        number: this.number,
        info: this.info,
        homepage: this.homepage,
        image: this.image,
        category:this.category
      });
    },
    save() {
      let categorys = {}
      axios.get("/category")
        .then(response=>{
          categorys = response.data.data;
          let  item = {}
          for (item in categorys){
            if (categorys[item].name == this.category){
              this.category={id:parseInt(item) + 1, name:this.category};
              axios
                .post("/seller/product/add", {
                  id:this.id,
                  name: this.name,
                  price: this.price,
                  number: this.number,
                  info: this.info,
                  homepage: this.homepage,
                  image: this.image,
                  category:this.category
                })
                .then(response => {
                  this.name = '';
                  this.price = '';
                  this.info = '';
                  this.number=0;
                  this.image = '';
                  this.back();
                })
                .catch(err => {
                  alert(JSON.stringify(err.response.data.message));
                })
            }
          }
        }).catch(err=>{
        alert("find category error");
      });
    }
  }
};
</script>

<style scoped>
.btn-add {
  width: 100%;
  height: 40px;
  background-color: rgba(125, 140, 218, 0.3);
  margin: 0 auto;
  padding: 0;
}
.btn {
  width: 100%;
  height: 40px;
  background-color: rgba(125, 140, 218, 0.3);
  margin: 0 auto;
  padding: 0;
}
.btn:hover {
  background-color: rgba(125, 140, 218, 1);
}

.modal-dialog {
  max-width: 80%;
}
.btn-c {
  width: 80px;
  height: 40px;
  background-color: rgba(125, 140, 218, 0.8);
  margin: 0 auto;
  padding: 0;
}
</style>

