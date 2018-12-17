<template>
  <div class="seller-infos">
    <img src="../assets/预设头像.png">

    <form class="seller-infos-table">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">name</label>
        <div class="col-sm-9">
          <input type="text" class="form-control"  placeholder v-model="sellername" readonly>
        </div>
      </div>


      <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Telephone</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="inputTel" placeholder v-model="personalphone" pattern="^[1][0-9]{10}"
          readonly="true">
        </div>
      </div>
      <div class="form-group row">
        <label  class="col-sm-3 col-form-label">Email</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="inputLocation" placeholder v-model="personalemail" readonly="true">
        </div>
      </div>



      <div class="form-group row">
        <div class="col-sm-5">
          <button
            type="button"
            class="btn btn-primary btn-seller"
            @click="toFirststep"
          >back</button>
        </div>
        <div class="col-sm-5">
          <button type="button" class="btn btn-primary btn-seller" @click="toThreestep">Next</button>
        </div>
      </div>
    </form>




  </div>
</template>
<script>
import axios from "axios";
import storage from '../model/storage.js'
import Bus from './bus.js'
export default {
  data() {
    return {
      sellername: '',
        personalphone:'',

      location: '',
        personalemail:'',
        email:'',

    };
  },

    //自动加载
    mounted() {
      this.sellername=storage.get("userName");
      this.personalphone = storage.get("telephone");
      this.personalemail = storage.get("email");
    },

  methods: {
    toFirststep(){
        this.$parent.ruleshow=true;
        this.$parent.sellershow = false;
        this.$parent.storeshow = false;
        this.$parent.current = 0;
    },
    toThreestep() {
        storage.set('IDcard',this.IDcard);
        storage.set('tel',this.tel);
        storage.set('loaction',this.location);
        storage.set('proof',this.proof);
        this.$parent.ruleshow=false;
        this.$parent.sellershow = false;
        this.$parent.storeshow = true;
        this.$parent.current = 2;



            Bus.$emit('msg', {'email':this.personalemail, 'telphone':this.personalphone,'sellername':this.sellername});

            console.log(this.personalemail,this.personalphone,this.sellername)




       /* console.log(storage.get('tel'));*/
    },



  }
};
</script>

<style scoped>
.seller-infos {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgb(141, 139, 211);
}
.seller-infos img {
  width: 100px;
  height: 100px;
  background-color: #0099cc;
  position: relative;

  left: 15%;
  margin-top: 20%;
}
.seller-infos-table {
  float: right;
  margin-top: 5%;
  margin-right: 20px;
}
.btn-seller {
  width: 65px;
  height: 40px;
}
</style>

