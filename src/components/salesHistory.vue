<template>
  <!-- 管理订单 -->
  <div class="contents" id="lynContent" >
    <!--搜索框-->
    <div class="search input-search" style="display:flex; ">
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

      <!--不同时间获取销量 -->
    <div style="width:50%">
      <Select v-model="model1" style="width:30%; float:left; margin-bottom:10px; margin-left:10px;" placeholder="Monthly">
        <Option v-for="item in cityList" :value="item.value" :key="item.value" @click.native="selectStatus(item)">{{ item.label }}</Option>
      </Select>
      <div style="float:left;">
        <time-selector></time-selector>
      </div>
    </div>
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
            <th>Number</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in goods" @click="saleDetail(items)">
            <td>
              <img :src="items.productImg" alt="image" width="50" height="50">
            </td>
            <td class="add-td">{{items.productName}}</td>
            <td class="add-td">{{items.price}}</td>
            <td class="add-td">{{items.status}}</td>
            <td class="add-td">{{items.number}}</td>
            <td class="add-td">{{items.totalPrice.toFixed(2)}}</td>
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
.search {
  width: 70%;
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
import axios from "axios";
import loading from "./loading";
import timeSelector from "./TimeSelector";
import bus from "./bus";

export default {
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      category: "",
      info: "",
      image: "",
      number: "",
      productName:"",
      modal5: false,
      status:"",
      page: "0",
      size: "5",
      positive: "",
      goods: [],
      searchname: "",
      currentpage: 1,
      productImg:"",
      numBut: 0,
      priceBut: 0,
      salesBtn: 0,
      id: "",
      totalProduct: 0,
      loadingshow: false,
      timevalue:0,
      dateStatus:'monthly',
      beforeNum:0,
      currentDate:new Date(),
      selectedDate:new Date(),
      detail:false,
      commission:0,
      cityList: [
        {
          value: "daily",
          label: "Daily"
        },
        {
          value: "weekly",
          label: "Weekly"
        },
        {
          value: "monthly",
          label: "Monthly"
        },
        {
          value: "yearly",
          label: "Yearly"
        }
      ],
      model1: "1"
    };
  },

  components: {
    loading,
    timeSelector
  },
  //自动加载
  mounted() {
    let that = this;
    this.timevalue = this.currentDate.getMonth()+1;
    this.getTotalProduct();
    axios.get("/seller/sales/list", {
      params: {
        beforeNum: 0,
        type: "monthly",
        page:0,
        size:this.size
      }
    }).then(response=>{
      this.goods = response.data.data;
    }).catch(e=>{
      console.log(JSON.stringify(e));
    });
    bus.$on("timeSelect", function (data) {
      let date = new Date(data);
      that.selectedDate = date;
      that.setBeforeNum();
    })

  },

  methods: {
    getTotalProduct(item){
      if (this.detail === false){
        axios
          .get("/seller/product/num")
          .then(response => {
            this.totalProduct = response.data.data;
          })
          .catch(() => {
            this.totalProduct = 5;
          });
      } else {
        axios
          .get("/seller/product/sales/amount", {
            params:{
              productName: item.productName
            }
          })
          .then(response => {
            this.totalProduct = response.data.data;
          })
          .catch(() => {
            this.totalProduct = 5;
          });
      }
    },
    setBeforeNum(){
      if (this.dateStatus === "daily"){
        let t = this.currentDate.getTime() - this.selectedDate.getTime();
        if (t < 0){
          this.$Message.error("this date is bigger than curret date");
        } else {
          this.beforeNum = (t / 86400000).toFixed(0);
          this.pageChange();
        }
      }else if (this.dateStatus === "weekly"){
        let t = this.currentDate.getTime() - this.selectedDate.getTime();
        t = (t / 86400000).toFixed(0);//DAY NUM
        if (t < 0){
          this.$Message.error("this date is bigger than curret date");
        }else {
          if ((t - this.currentDate.getDay()) < 0){
            this.beforeNum = 0;
          }else {
            t -= this.currentDate.getDay();
            if (t % 7 === 0) {
              this.beforeNum = (t / 7);
            }else this.beforeNum = (t / 7 + 1).toFixed(0);
          }
          this.pageChange();
        }
      }else if (this.dateStatus === "monthly"){
        let t = this.currentDate.getTime() - this.selectedDate.getTime();
        if (t < 0){
          this.$Message.error("this date is bigger than curret date");
        }else {
          if (this.selectedDate.getFullYear() === this.currentDate.getFullYear()){
            this.beforeNum = this.currentDate.getMonth() - this.selectedDate.getMonth();
          }else {
            this.beforeNum = 12 * (this.currentDate.getFullYear() - this.selectedDate.getFullYear());
            this.beforeNum += this.currentDate.getMonth() - this.selectedDate.getMonth();
          }
          this.pageChange();
        }
      }else if (this.dateStatus === "yearly"){
        let t = this.currentDate.getTime() - this.selectedDate.getTime();
        if (t < 0){
          this.$Message.error("this date is bigger than curret date");
        }else{
          this.beforeNum = this.currentDate.getFullYear() - this.selectedDate.getFullYear();
          this.pageChange();
        }
      }
    },
    pageChange() {
      if (this.detail === false){
        axios
          .get("/seller/sales/list", {
            params: {
              beforeNum:this.beforeNum,
              type:this.dateStatus,
              page: this.currentpage - 1,
              size: this.size,
            }
          })
          .then(response => {
            this.goods = response.data.data;
          })
          .catch(err => {
            this.goods = "";
            console.error(err.response);
          });
      }else {
        this.saleDetail(this.goods[0])
      }
    },
    selectStatus(item){
      this.detail = false;
      this.dateStatus = item.value;
      if (item.value === "daily"){
        this.timevalue = this.currentDate.getDate();
      } else if (item.value === "monthly"){
        this.timevalue = this.currentDate.getMonth()+1;
      } else if (item.value === "yearly"){
        this.timevalue = this.currentDate.getYear() - 100;
      } else if (item.value === "weekly"){
        //当年第一天是星期几
        var yearFirstDay = new Date(this.currentDate.getFullYear(), 0, 1).getDay() || 7;
        var week = 0;
        if (yearFirstDay === 1){
          week = Math.ceil(days / yearFirstDay);
        }else {
          week = Math.ceil((this.currentDate.getDate() - (8 - yearFirstDay)) / 7) + 1
        }
        this.timevalue = week;
      }
      this.setBeforeNum();
      this.currentpage = 1;
      this.pageChange();
    },
    saleDetail(items){
      if (items.number !== 0){
        this.detail = true;
        this.getTotalProduct(items);
        axios.get("/seller/sales/listByTime", {
          params:{
            beforeNum:this.beforeNum,
            type:this.dateStatus,
            page:this.currentpage-1,
            size:this.size,
            productName:items.productName
          }
        }).then(response=>{
          this.goods = response.data.data;
          for (var i = 0; i < this.goods.length;i++){
            this.goods[i].totalPrice -= this.goods[i].commission;
          }
        }).catch(err=>{
          console.log(err);
        })
      }else this.$Message.error("product unsold");
    },

    search() {
      this.detail = false;
      this.getTotalProduct();
      if (this.searchname !== ""){
        axios
          .get("/seller/sales/search", {
            params: {
              beforeNum:this.beforeNum,
              type:this.dateStatus,
              productName:this.searchname
            }
          })
          .then(response => {
            this.goods = [];
            this.goods[0] = response.data.data;
          })
          .catch(err => {
            this.goods = "";
            console.error(err.response);
          });
      } else {
        axios
          .get("/seller/sales/list", {
            params: {
              beforeNum:0,
              type: "monthly",
              page: 0,
              size: this.size,
            }
          })
          .then(response => {
            this.goods = response.data.data;
          })
          .catch(err => {
            this.goods = "";
            console.error(err.response);
          });
        this.currentpage = 1;
      }
    }
  }
};
</script>


