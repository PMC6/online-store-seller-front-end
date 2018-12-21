<template>
  <!-- 广告页面中的所有商品页面 -->
  <div>
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
      <button type="submit" class="btn col-sm-4" @click="getbyprice" v-model="salesBut">Sales</button>
      <button type="submit" class="btn col-sm-4" @click="getbynum" v-model="priceBut">Price</button>
      <button type="submit" class="btn col-sm-4" @click="getbysales" v-model="newBut">new products</button>
    </div>
    <!-- 商品展示列表 -->
   <div class="container" >
    <div class="row">
      <div class="col-md-3 col-sm-6">
        <div class="product-grid6">
          <div class="product-image6">
            <a href="#">
              <img
                class="pic-1"
                src="http://bestjquery.com/tutorial/product-grid/demo10/images/img-1.jpg"
              >
            </a>
          </div>
          <div class="product-content">
            <h3 class="title">
              <a href="#">Men's Shirt</a>
            </h3>
            <div class="price">
              $11.00
              <span>$14.00</span>
            </div>
          </div>
          <ul class="social">
            <li>
              <a href data-tip="Quick View">
                <i class="fa fa-search"></i>
              </a>
            </li>
            <li>
              <a href data-tip="Add to Wishlist">
                <i class="fa fa-shopping-bag"></i>
              </a>
            </li>
            <li>
              <a href data-tip="Add to Cart">
                <i class="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    <!-- 分页 -->
    <div class="div2">
      <Page
        :total="100"
        prev-text="Previous"
        next-text="Next"
        @on-change="test()"
        :current.sync="currentpage"
      />
    </div>
  </div>
</template>
<style scoped>
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
.products-order {
  width: 100%;
  margin: 30px auto;
}
.search {
  width: 40%;
  margin: 2% auto;
  text-align: center;
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
.div1 {
  width: 100%;
}
.div2 {
  width: 30%;
  margin: 20px auto;
}
.row {
  width: 100%;
}

/********************* Shopping Demo-6 **********************/
.product-grid6,
.product-grid6 .product-image6 {
  overflow: hidden;
}
.product-grid6 {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  position: relative;
  transition: all 0.5s ease 0s;
}
.product-grid6:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.product-grid6 .product-image6 a {
  display: block;
}
.product-grid6 .product-image6 img {
  width: 100%;
  height: auto;
  transition: all 0.5s ease 0s;
}
.product-grid6:hover .product-image6 img {
  transform: scale(1.1);
}
.product-grid6 .product-content {
  padding: 12px 12px 15px;
  transition: all 0.5s ease 0s;
}
.product-grid6:hover .product-content {
  opacity: 0;
}
.product-grid6 .title {
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
  margin: 0 0 10px;
  transition: all 0.3s ease 0s;
}
.product-grid6 .title a {
  color: #000;
}
.product-grid6 .title a:hover {
  color: #2e86de;
}
.product-grid6 .price {
  font-size: 18px;
  font-weight: 600;
  color: #2e86de;
}
.product-grid6 .price span {
  color: #999;
  font-size: 15px;
  font-weight: 400;
  text-decoration: line-through;
  margin-left: 7px;
  display: inline-block;
}
.product-grid6 .social {
  background-color: #fff;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  opacity: 0;
  transform: translateX(-50%);
  position: absolute;
  bottom: -50%;
  left: 50%;
  z-index: 1;
  transition: all 0.5s ease 0s;
}
.product-grid6:hover .social {
  opacity: 1;
  bottom: 20px;
}
.product-grid6 .social li {
  display: inline-block;
}
.product-grid6 .social li a {
  color: #909090;
  font-size: 16px;
  line-height: 45px;
  text-align: center;
  height: 45px;
  width: 45px;
  margin: 0 7px;
  border: 1px solid #909090;
  border-radius: 50px;
  display: block;
  position: relative;
  transition: all 0.3s ease-in-out;
}
.product-grid6 .social li a:hover {
  color: #fff;
  background-color: #2e86de;
  width: 80px;
}
.product-grid6 .social li a:after,
.product-grid6 .social li a:before {
  content: attr(data-tip);
  color: #fff;
  background-color: #2e86de;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 20px;
  padding: 1px 5px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-50%);
  position: absolute;
  left: 50%;
  top: -30px;
}
.product-grid6 .social li a:after {
  content: "";
  height: 15px;
  width: 15px;
  border-radius: 0;
  transform: translateX(-50%) rotate(45deg);
  top: -20px;
  z-index: -1;
}
.product-grid6 .social li a:hover:after,
.product-grid6 .social li a:hover:before {
  opacity: 1;
}
@media only screen and (max-width: 990px) {
  .product-grid6 {
    margin-bottom: 30px;
  }
}
</style>

<script>
import products from "./Products";
export default {
  data() {
    return {
      currentpage: 1,
      priceBut: 0,
      salesBut: 0,
      newBut: 0,

      productList: [],
      searchName: "",
      product: null
    };
  },
  components: {
    products
  },
  mounted() {},
  methods: {
    search() {
      if (this.searchname != null) {
        this.loadingshow = true;
        axios
          .get("/seller/product/search", {
            params: {
              name: this.searchname
            }
          })
          .then(response => {
            this.loadingshow = false;
            let products = [];
            products[0] = response.data.data;
            this.goods = products;
            // console.log(JSON.stringify(this.goods[0]));
          })
          .catch(err => {
            this.loadingshow = false;
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

