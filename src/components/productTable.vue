<template>
  <!-- 管理商品模块中的商品列表 -->
  <div class="contents" id="lynContent">
    <!--搜索框-->
    <div class="search input-search">
      <input
        class="input"
        type="text"
        placeholder="Enter To Search "
        autofocus
        x-webkit-speech
        v-model="searchname"
        @keyup.enter="search"
      >
    </div>
    <loading v-show="loadingshow"></loading>
    <!--商品一览-->
    <div style="display:flex;" class="products-order row">
      <button type="submit" class="btn col-sm-3">Applied</button>
      <button type="submit" class="btn col-sm-3">Not applied</button>
      <button type="submit" class="btn col-sm-3">Sales</button>
      <!--商品添加-->
      <button class="btn col-sm-3">Price</button>
    </div>
    <!-- 商品简略 -->
    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Number</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in goods">
            <td>
              <img :src="items.image" alt="image" width="50" height="50">
            </td>
            <td class="add-td" @click="()=>{productDetail(items)}">{{items.name}}</td>
            <td class="add-td" @click="()=>{productDetail(items)}">{{items.price}}</td>
<td class="add-td" @click="()=>{productDetail(items)}">{{items.number}}</td>
            <td class="add-td" @click="()=>{productDetail(items)}">{{items.status}}</td>
            
            <td>
              <button
                type="button"
                class="add-s btn btn-search"
                @click="()=>{applyAdvertise(items)}"
              >Apply</button>
              <button type="button" class="btn btn-delete" data-id="delBtn">Canael</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <Page
      :total="100"
      prev-text="Previous"
      next-text="Next"
      @on-change="test()"
      :current.sync="currentpage"
    />
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
  border: 2px solid rgba(125, 140, 218, 1);
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
      condition: "",
      homePage:'',
      page: "0",
      size: "5",
      positive: "",
      goods: [],

      searchname: "",
      currentpage: 1,
      numBut: 0,
      priceBut: 0,
      salesBtn: 0,
      id: "",

      loadingshow:false
    };
  },

  components: {
    LynModal,
    ProductDispaly,
    loading
  },
  //自动加载
  mounted() {
    this.paginations();
    Bus.$on("txt", function(val) {
      this.goods.push(
        val.image,
        val.name,
        val.price,
        val.number,
        val.status
      );
    });
  },

  methods: {
    test() {
      /* to the currentpage*/
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
    },
    applyAdvertise(items) {
      this.$parent.tableshow = false;
      this.$parent.applyshow = true;
      console.log(items);

      // alert(JSON.stringify(items));

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
        homePage: items.homePage,
        status:items.status
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
        })
        .catch(err => {
          console.error(err.response);
        });
    },

    getbyprice() {
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

    getbynum() {
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
    getbysales() {
      //按照销量排序
    },
    search() {
      if (this.searchname != null) {
        this.loadingshow=true;
        axios
          .get("/seller/product/search", {
            params: {
              name: this.searchname
            }
          })
          .then(response => {
            this.loadingshow=false;
            let products = [];
            products[0] = response.data.data;
            this.goods = products;
            console.log(JSON.stringify(this.goods[0]));
          })
          .catch(err => {
             this.loadingshow=false;
            this.goods = [];
            // alert("there is nothing named " + this.searchname);
            this.$Message.info("there is nothing named " + this.searchname);
            // console.error(err.response);
         
         });
      }
      }
    }
  };
</script>


