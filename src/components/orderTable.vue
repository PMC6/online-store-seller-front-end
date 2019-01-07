<template>
  <!-- 管理订单 -->
  <div class="contents" id="lynContent">
    <!--搜索框-->
    <div class="search input-search" style="display:flex;">
      <Input
        v-model="searchname"
        placeholder="Enter To Search"
        clearable
        style="width: 50%;border-radius:50%;"
        class="input"
        @on-enter="search"
        suffix="ios-search"
        autofocus
      />
      <Select
        v-model="model1"
        style="width:20%; float:left; margin-bottom:10px; margin-left:20px;"
        placeholder="Please choose"
      >
        <Option
          v-for="item in cityList"
          :value="item.value"
          :key="item.value"
          @click.native="selectStatus(item)"
        >{{ item.label }}</Option>
      </Select>
    </div>

    <Modal
        v-model="modal1"
        title="Order Information"
        ok-text="OK"
        cancel-text="Cancel"
        width="500px;"
        >

     <Form :model="formItem" :label-width="150">
        <FormItem label="Product Name">
            <Input v-model="formItem.productName" readonly="true"></Input>
        </FormItem>
        <FormItem label="Product Price">
            <Input v-model="formItem.productPrice" readonly="true"></Input>
        </FormItem>
        <FormItem label="Purchased Number">
            <Input v-model="formItem.productNumber" readonly="true"></Input>
        </FormItem>
        <FormItem label="Total Price">
            <Input v-model="formItem.totalPrice" readonly="true"></Input>
        </FormItem>
        <FormItem label="Customer Name">
            <Input v-model="formItem.customerName" readonly="true"></Input>
        </FormItem>
        <FormItem label="Customer Tel">
            <Input v-model="formItem.customerTel" readonly="true"></Input>
        </FormItem>
        <FormItem label="Customer Address">
            <Input v-model="formItem.customerAddress" readonly="true"></Input>
        </FormItem>
       <FormItem label="Create Time">
         <Input v-model="formItem.time" readonly="true"></Input>
       </FormItem>
    </Form>
    <div slot="footer" style="text-align:center;">
            <Button type="info" size="large" :loading="modal_loading" @click="modal1 = false">Ensure</Button>
        </div>
    </Modal>
    <loading v-show="loadingshow"></loading>
    <!-- 商品简略 -->
    <div class="content table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th >Product Image</th>
            <th >Name</th>
            <th >Price</th>
            <th>Status</th>
            <th>Number</th>
            <th >Total Sales</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in goods">
            <td @click="orderInfo(item)">
              <img :src="item.productImg" alt="image" width="50" height="50">
            </td>
            <td class="add-td" @click="orderInfo(item)">{{item.productName}}</td>
            <td class="add-td" @click="orderInfo(item)">{{item.price}}</td>
            <td class="add-td" @click="orderInfo(item)">{{item.status}}</td>
            <td class="add-td" @click="orderInfo(item)">{{item.number}}</td>
            <td class="add-td" @click="orderInfo(item)">{{item.totalPrice}}</td>
            <td>
              <button
                type="button"
                class="add-s btn btn-search"
                @click="()=>{cancelOrder(item)}"
              >Cancel</button>
              <button
                type="button"
                class="btn btn-delete"
                data-id="delBtn"
                @click="()=>{promoteOrder(item)}"
              >Promote</button>
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
  width: 60%;
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

  /*line-height: 50px;*/
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
  font-size: 12px;
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
import loading from "./loading";

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
      productName: "",
      totalPrice: 0,
      page: "0",
      size: "5",
      positive: "",
      goods: [],
      searchname: "",
      currentpage: 1,
      ordersNum:0,
      id: "",
      totalProduct: "",
      productImg: "",
      loadingshow: false,
      choosedStatus: "",
      cityList: [
        {
          value: "Processing Order",
          label: "Processing Order"
        },
        {
          value: "Preparing for Shipment",
          label: "Preparing for Shipment"
        },
        {
          value: "Shipped",
          label: "Shipped"
        },
        {
          value: "Complete",
          label: "Complete"
        }
      ],
      model1: "",
      modal1: false,
      formItem: {
                    productName: '',
                    productPrice: '',
                    productNumber: '',
                    totalPrice: '',
                    customerName: '',
                    customerTel:'',
                    customerAddress:'',
                    time:null,
                }
    };
  },

  components: {
    LynModal,
    ProductDispaly,
    loading
  },
  //自动加载
  mounted() {
    this.pageChange();
    axios
      .get("/seller/order/amount", {
        params: {
          status: "null"
        }
      })
      .then(response => {
        this.totalProduct = response.data.data;
        this.ordersNum = this.totalProduct;
      })
      .catch(() => {
        this.totalProduct = 5;
      });
  },

  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },

    orderInfo(item){
      this.modal1 = true;
      axios.get("/seller/order/findProductInfo",{
        params:{
          orderId: item.id
        }
      }).then(response=>{
        let tmp = response.data.data;
        this.formItem.productName = item.productName;
        this.formItem.productPrice = item.price;
        this.formItem.productNumber = item.number;
        this.formItem.totalPrice = item.totalPrice;
        this.formItem.customerName = tmp.shop.user.username;
        this.formItem.customerAddress = tmp.shop.user.address;
        this.formItem.customerTel = tmp.shop.user.telephone;
        this.formItem.time = item.createTime.toString().substring(0, 10) + " " + item.createTime.toString().substring(11, 19);
      }).catch(e=>{
        alert("err " + JSON.stringify(e));
      })
    },

    pageChange() {
      /* to the currentpage*/
      if (this.choosedStatus === "" && this.searchname === "") {
        //常态
        axios
          .get("/seller/order/listByShopName", {
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
      } else if (this.searchname === "") {
        //选择了orderStatus
        axios
          .get("/seller/order/listByOrderStatus", {
            params: {
              status: this.choosedStatus,
              page: this.currentpage - 1,
              size: this.size
            }
          })
          .then(response => {
            this.goods = response.data.data;
            axios.get("/seller/order/amount", {
              params:{
                status:this.choosedStatus
              }
            }).then(response=>{
              this.totalProduct = response.data.data;
            }).catch(e=>{
              alert(JSON.stringify(e));
            })
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        axios
          .get("/seller/order/product/list", {
            params: {
              productName: this.searchname,
              page: this.currentpage - 1,
              size: this.size
            }
          })
          .then(response => {
            this.goods = response.data.data;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },

    cancelOrder(items) {

      if (items.status === "Processing Order") {
        this.$Modal.confirm({
          title:"Are you sure to cancel this order?",
          onOk:()=>{
            axios
              .put("/seller/order/cancel", {
                orderId: items.id
              })
              .then(response => {
                this.$Message.success("cancel success");
                this.pageChange();
              })
              .catch(e => {
                console.log(e);
              });
          }
        })
      } else this.$Message.error("you can't cancel this order");
    },

    promoteOrder(item) {
      let nextStatus = "";
      if (item.status === "Processing Order"){
        nextStatus = "Preparing for Shipment";
      }else if (item.status === "Preparing for Shipment") {
        nextStatus = "Shipped";
      }else if (item.status === "Shipped") nextStatus = "Complete";

      let tmp = "Are you sure to promote this order's status from  `" + item.status + "` to `" + nextStatus + "` ?";

      if (item.status !== "Complete") {
        this.$Modal.confirm({
          title:tmp,
          onOk:()=>{
            axios
              .put("/seller/order/update", {
                orderId: item.id
              })
              .then(response => {
                this.currentpage=1;
                this.$Message.success("promote success");
                this.pageChange();
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
      } else this.$Message.error("you have complete this order");

    },

    selectStatus(item) {
      this.searchname = "";
      this.choosedStatus = item.value;
      axios
        .get("/seller/order/amount", {
          params: {
            status: this.choosedStatus
          }
        })
        .then(response => {
          this.totalProduct = response.data.data;
        })
        .catch(e => {
          this.totalProduct = this.size;
        });
      axios
        .get("/seller/order/listByOrderStatus", {
          params: {
            status: this.choosedStatus,
            page: 0,
            size: this.size
          }
        })
        .then(response => {
          this.goods = response.data.data;
        })
        .catch(e => {
          this.goods = "";
          this.$Message.error("no order in this status");
        });
    },

    search() {
      this.choosedStatus="";
      if (this.searchname === "") {
        this.currentpage = 1;
        axios
          .get("/seller/order/listByShopName", {
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
        this.totalProduct = this.ordersNum;
      } else {
        axios
          .get("/seller/product/sales/amount", {
            params: {
              productName: this.searchname
            }
          })
          .then(response => {
            this.totalProduct = response.data.data;
          })
          .catch(e => {
            this.totalProduct = this.size;
          });
        axios
          .get("/seller/order/product/list", {
            params: {
              productName: this.searchname,
              page: 0,
              size: this.size
            }
          })
          .then(response => {
            this.$Message.success("search success");
            this.goods = response.data.data;
          })
          .catch(e => {
            this.$Message.error("no this product's order");
          });
      }
    }
  }
};
</script>


