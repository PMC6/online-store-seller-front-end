<template>
  <!-- 广告中的首页 -->
  <div>
    <!-- 轮番图 -->
    <div class="div2">
      <Carousel v-model="value2" loop autoplay>
        <CarouselItem v-for="(image,index) in imagelist" :key="index" >
          <div class="demo-carousel">
            <img :src="image.image" alt="image" >
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <!-- 新品推荐 -->
    <div class="div3">
      <span>New Products</span>
    </div>
    <!-- 商品列 -->
    <div class="productdiv">
      <div class="row">
        <div class="col-md-3 col-sm-6" v-for="item in goods">
          <div class="product-grid6">
            <div class="product-image6">
              <a href="#">
                <img class="pic-1" :src="item.image">
              </a>
            </div>
            <div class="product-content">
              <h3 class="title">
                <a href="#">{{item.name}}</a>
              </h3>
              <div class="price">{{item.price}}</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import products from "./Products";
import axios from "axios";
import Bus from "./bus.js";
import storage from "../model/storage";

export default {
  data() {
    return {
      value2: 0,

      goods: [],
      imagelist: [
        require('../assets/huawei.jpg')
      ]
    };
  },
  components: {
    products
  },
  methods: {
    getProduct() {}
  },
  mounted() {
    let that = this;
    Bus.$on("login", function(data) {
      axios
        .get("/seller/product/list", {
          params: {
            page: 0,
            size: 5
          }
        })
        .then(response => {
          that.goods = response.data.data;
        })
        .catch(err => {
          console.error(err.response);
        });
    });
    Bus.$on("shopInfoLoad", function(data) {
      axios
        .get("/seller/product/advertisement/all", {
          params: {
            shopName: storage.get("shopName")
          }
        })
        .then(response => {
          that.imagelist = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>
<style scoped>
.productdiv {
  width: 100%;
  height: 400px;
}
.div3 {
  width: 100%;
  height: 94px;
  background-color: #9999ff;
  margin: 20px auto;
  text-align: center;
  font-size: 60px;
  color: #fff;
}
.div2 {
  width: 100%;
  height: 520px;
  overflow: hidden;
}
.div2 img {
  display: block;
  width: 100%;
  height: 520px;
  cursor: pointer;
}
.row {
  width: 100%;
}
h3.h3 {
  text-align: center;
  margin: 1em;
  text-transform: capitalize;
  font-size: 1.7em;
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
  height:400px;
}
.product-grid6:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.product-grid6 .product-image6 a {
  display: block;
}
.product-grid6 .product-image6 img {
  width: 100%;
  height:250px;
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
  /* opacity: 0;*/
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


