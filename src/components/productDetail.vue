<template>
<!-- 管理商品模块中的商品列表 -->
  <div class="contents" id="lynContent">

    <!--搜索框-->
    <div class="search input-search">
      <Input
        v-model="searchname"
        placeholder="Enter To Search"
        clearable
        style="width: 100%;border-radius:50%;"
        class="input"
        @on-enter="search"
        suffix="ios-search"
        autofocus
      />
    </div>
    <!--商品一览-->
    <div style="display:flex;" class="products-order row">
      <button type="submit" class="btn col-sm-4" @click="getbynum" v-model="numBut">Left</button>
      <button type="submit" class="btn col-sm-4" @click="getbyprice" v-model="priceBut">Price</button>
      <!--商品添加-->
      <button class="btn col-sm-4" @click="addProduct">Add</button>
    </div>
    <loading v-show="loadingshow"></loading>
    <!-- 商品简略 -->
    <div class="content table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Left</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in goods">
            <td >
              <img :src="items.image" alt="image" width="50" height="50" >
            </td>
            <td class="add-td">{{items.name}}</td>
            <td class="add-td">{{items.price}}</td>
            <td class="add-td">{{items.homePage}}</td>
            <td class="add-td">{{items.number}}</td>
            <td>
              <button
                type="button"
                class="add-s btn btn-search"
                @click="()=>{productDetail(items)}"
              >Detail</button>
              <button
                type="button"
                class="btn btn-delete"
                data-id="delBtn"
                @click="()=>{deleteall(items.id)}"
              >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="page">
      <Page
        :total="totalProduct"
        :page-size="5"
        prev-text="Previous"
        next-text="Next"
        @on-change="pageChange"
        :current.sync="currentpage"
      />
    </div>
  </div>
</template>
<style scoped>
/* li {
  list-style-type: none;
} */

.search {
  width: 30%;
  margin: 2% auto;
}
.add-td {
  margin-top: 50px;
}
.add-s {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: none;
}
.input-search {
  height: 30px;
  /* border: 2px solid rgba(125, 140, 218, 1); */
  border-radius: 50em;
}
.input {
  width: 95%;
  height: 100%;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}
.input:hover {
  border: none;
}
.contents {
  text-align: center;
}
.content {
  position: relative;
  height: 450px;
}

.content table tbody td {
  width: 10%;

  line-height: 50px;
}

.page {
  margin-top: 30px;
}
.page-D {
  /* padding-top: 100px;
  padding-left: 300px;
  clear: both; */
  width: 50%;
  margin: 2% auto;
}
.add {
  margin-right: 50px;
  width: 50px;
  height: 35px;
  background-color: #66afe9;
}
.products-order {
  width: 96%;
  margin: 0 auto;
}

.btn {
  margin: 0;
  width: 30%;
  height: 38px;
  background-color: rgba(125, 140, 218, 0.8);
}
.btn:hover {
  background-color: rgb(28, 83, 145);
  color: #fff;
}
.btn-delete {
  width: 40%;
  background-color: rgb(28, 145, 81);
  color: #fff;
}
.btn-search {
  width: 40%;
  background-color: rgb(37, 18, 32);
  color: #fff;
}
.searchBtn {
  width: 20%;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  color: #000;
}
</style>

<script>
import Bus from "./bus.js";
import LynModal from "./addProduct.vue";
import ProductDispaly from "./productDisplay.vue";
import axios from "axios";
import loading from './loading'

export default {
  name: "Test",
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      category: "",
      info: "",
      image: "",
      shopId: "",
      number: "",
      userId: "",
      homePage: true,

      page: "0",
      size: "5",
      positive: "",
      goods: [],
      searchname: "",
      currentpage: 1,
      numBut: 0,
      priceBut: 0,
      salesBtn:0,
      id: "",
      totalProduct:0,
      loadingshow:false,
      searchBtn:false,
    };
  },

  components: {
    LynModal,
    ProductDispaly,
    loading
  },
  //自动加载
  mounted() {
    let that= this;
    this.paginations();
    Bus.$on("txt", function(val) {
      this.goods.push(val.image, val.name, val.price, val.number);
    });
    Bus.$on("addProductSaveEvent", function(data){
      that.pageChange();
    });
    Bus.$on("updateEvent", function(data){
      that.pageChange();
    });
    axios.get("/seller/product/num")
      .then(response=>{
        this.totalProduct = response.data.data;
      }).catch(()=>{
      this.totalProduct = 5;
    });
  },

  methods: {
    pageChange() {
      /* to the currentpage*/
      if (!this.searchBtn){
        if (this.numBut == 0 && this.priceBut == 0) {
          axios
            .get("/seller/product/list", {
              params: {
                page: this.currentpage - 1,
                size: this.size,
                positive: true
              }
            })
            .then(response => {
              this.goods = response.data.data;
            })
            .catch(err => {
              this.goods = "";
              console.error(err.response);
            });
        } else if (this.numBut != 0) {
          let temp = true;
          if (this.numBut == 2) temp = false;
          axios
            .get("/seller/product/sortByStock", {
              params: {
                page: this.currentpage - 1,
                size: this.size,
                positive: temp
              }
            })
            .then(response => {
              this.goods = response.data.data;
            })
            .catch(err => {
              this.goods = "";
              console.error(err.response);
            });
        } else if (this.priceBut != 0) {
          let temp = true;
          if (this.priceBut == 2) temp = false;
          axios
            .get("/seller/product/sortByPrice", {
              params: {
                page: this.currentpage - 1,
                size: this.size,
                positive: temp
              }
            })
            .then(response => {
              this.goods = response.data.data;
            })
            .catch(err => {
              this.goods = "";
              console.error(err.response);
            });
        }
      }else {
        axios
          .get("/seller/product/search", {
            params: {
              name: this.searchname,
              page:this.currentpage-1,
              size:this.size
            }
          })
          .then(response => {
            this.loadingshow=false;
            this.goods = response.data.data;
          })
          .catch(err => {
            this.loadingshow=false;
            this.goods = [];
            this.$Message.info("there is nothing named " + this.searchname);
          });
      }
    },

    addProduct() {
      if (this.searchBtn){
        this.searchBtn=false;
        this.searchname="";
        this.getProductNum();
      }
      this.$parent.detailshow = false;
      this.$parent.addshow = true;
    },
    productDetail(items) {
      if (this.searchBtn){
        this.searchBtn=false;
        this.getProductNum();
        this.searchname="";
      }
      this.$parent.detailshow = false;
      this.$parent.displayshow = true;
      Bus.$emit("msg", {
        id: items.id,
        email: items.email,
        price: items.price,
        name: items.name,
        category: items.category,
        image: items.image,
        info: items.info,
        number: items.number,
        userId: items.userId,
        homePage: items.homePage
      });
    },

    paginations() {
      axios
        .get("/seller/product/list", {
          params: {
            page: this.page,
            size: this.size,
            positive: false
          }
        })
        .then(response => {
          this.goods = response.data.data;
          console.log(response)
        })
        .catch(err => {
          console.error(err.response);
        });
    },

    deleteall(id) {
      this.$Modal.confirm({
        title:"Are you sure to update you shop's information?",
        onOk: ()=>{
          axios
            .delete("/seller/product/delete", {
              params: { id: id }
            })
            .then(response => {
              axios
                .get("/seller/product/list", {
                  params: {
                    page: 0,
                    size: this.size,
                    positive: false
                  }
                })
                .then(response => {
                  this.goods = response.data.data;
                  this.currentpage=1;
                  if (this.totalProduct > 0) this.totalProduct -= 1;
                })
                .catch(err => {
                  this.goods = [];
                  this.currentpage=1;
                  if (this.totalProduct > 0) this.totalProduct -= 1;
                  console.error(err.response);
                });
            })
            .catch(err => {
              console.error(err.response);
            });
        }
      })

    },

    getbyprice() {
      if (this.searchBtn){
        this.searchBtn=false;
        this.getProductNum();
        this.searchname="";
      }
      if (this.priceBut == 0 || this.priceBut == 2) this.priceBut = 1;
      else if (this.priceBut == 1) this.priceBut = 2;
      this.numBut = 0;
      this.currentpage = 1;
      let temp = true;
      if (this.priceBut == 2) temp = false;
      axios
        .get("/seller/product/sortByPrice", {
          params: {
            page: "0",
            size: this.size,
            positive: temp
          }
        })
        .then(response => {
          this.goods = response.data.data;
        })
        .catch(err => {
          console.error(err.response);
        });
    },
    getProductNum(){
      axios.get("/seller/product/num")
        .then(response=>{
          this.totalProduct = response.data.data;
        }).catch(()=>{
        this.totalProduct = 5;
      });
    },
    getbynum() {
      if (this.searchBtn){
        this.searchBtn=false;
        this.getProductNum();
        this.searchname="";
      }
      if (this.numBut == 0 || this.numBut == 2) this.numBut = 1;
      else if (this.numBut == 1) this.numBut = 2;
      this.priceBut = 0;
      this.currentpage = 1;
      let temp = true;
      if (this.numBut == 2) temp = false;
      axios
        .get("/seller/product/sortByStock", {
          params: {
            page: 0,
            size: this.size,
            positive: temp
          }
        })
        .then(response => {
          this.goods = response.data.data;
        })
        .catch(err => {
          console.error(err.response);
        });
    },
    search() {
      this.searchBtn=true;
      this.loadingshow=true;
      axios
        .get("/seller/product/search", {
          params: {
            name: this.searchname,
            page:0,
            size:this.size
          }
        })
        .then(response => {
          this.loadingshow=false;
          this.goods = response.data.data;
        })
        .catch(err => {
          this.loadingshow=false;
          this.goods = [];
          this.$Message.info("there is nothing named " + this.searchname);
        });
      axios.get("/seller/product/search/amount",{
        params:{
          name:this.searchname
        }
      })
        .then(response=>{
          this.totalProduct = response.data.data;
        }).catch(e=>{
        console.log(e);
      })
    }
  }
};
</script>


