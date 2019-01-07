<template>
  <!-- 管理订单 -->
  <div class="contents" id="lynContent">
    <div style="display:flex; ">
      <div style="margin:0 auto; display:flex; margin-top:30px;">
        <div class="divc">
          <span class="span1">Total Sales</span>
          <span>{{totalSales}}$</span>
        </div>

        <div style="width:200px; height:100px;"></div>
        <div class="divc">
          <span class="span1">Ad spending</span>
          <span>{{adSpending}}$</span>
        </div>
      </div>
    </div>
    <div>
      <Select v-model="model1" style="width:100px; position:relative;top:30px; left:-348px;" @on-change="ByTime">
        <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <div
      id="demo"
      style="width: 800px;height: 300px;border: 1px solid rgb(57, 117, 207); margin:50px auto;"
    ></div>


  </div>
</template>
<style scoped>
.contents {
  text-align: center;
}
.content {
  position: relative;
  height: 450px;
}

.contents .divc {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  text-align: center;
  background-color: rgb(57, 117, 207);
  border: none;
}
.span1 {
  display: block;
  margin-top: 35px;
  text-align: center;

  margin-bottom: 10px;
}
span {
  color: #fff;
}
</style>

<script>
import Bus from "./bus.js";
import echarts from "echarts";
import axios from "axios";


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

      modal5: false,

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
      currentDate: new Date(),
      usedDate:"",
      totalProduct: "",
      loadingshow: false,
      totalSales: "1",
      adSpending: "1",
      timeList: [
        {
          value: "Daily",
          label: "Daily"
        },
        {
          value: "Weekly",
          label: "Weekly"
        },
        {
          value: "Monthly",
          label: "Monthly"
        },
        {
          value: "Yearly",
          label: "Yearly"
        }
      ],
      beforenumber:0,
      model1: "Daily",
      timerange: ["7", "6", "5", "4", "3", "2", "1", "0"],
      everySales: [],
      everyadSpending:[]
    };
  },

  components: {},
  //自动加载
  mounted() {

    // this.demo();
    axios.get("/seller/order/totalSale")
      .then(response=>{
        this.totalSales = response.data.data.toFixed(2);
      }).catch(e=>{
        console.log(e)
    });
    axios.get("/seller/order/findAllPayment")
      .then(response=>{
        this.adSpending = response.data.data.toFixed(2);
      }).catch(e=>{
        console.log(e);
    });
    var d = this.currentDate.getFullYear().toString();
    if(this.currentDate.getMonth()+1 < 10) {
      d += "0" + (this.currentDate.getMonth()+1).toString();
    }else{
      d += (this.currentDate.getMonth()+1).toString();
    }
    if(this.currentDate.getDate() < 10){
      d += "0" + this.currentDate.getDate();
    }else{
      d += this.currentDate.getDate();
    }
    this.usedDate = d;
    this.Day();
  },

  methods: {
    Day() {
      this.everySales = [];
      this.everyadSpending = [];
      this.timerange = [];
      this.timerange[9] = this.currentDate.getDate();
      for (let i = 8;i >= 0;i--){
        this.timerange[i] = this.timerange[i+1]-1;
        if (this.timerange[i] == 0){
          switch (this.currentDate.getMonth()) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12: this.timerange[i] = 31; break;
            case 2:{
              let year = this.currentDate.getFullYear();
              if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                this.timerange[i] = 29;
              }else this.timerange[i] = 28;
            } break;
            default: this.timerange[i] = 30;
          }
        }
      }
      axios.get("/seller/sales/calByTime", {
        params:{
          date:this.usedDate,
          type:"daily"
        }
      }).then(response=>{
        let re = response.data.data;
        for (let i = 0;i < 10;i++){
          this.everySales[i] = re[2*i].toFixed(2);
          this.everyadSpending[i] = re[2*i+1].toFixed(2);
        }
        this.demo();
      }).catch(e=>{
      });
    },
    ByTime(){
      this.everyadSpending = [];
      this.everySales = [];

      if(this.model1=='Daily'){
            this.Day();
          }else if(this.model1=='Weekly'){
            this.timerange= ["7", "6", "5", "4", "3", "2", "1", "0"];
        axios.get("/seller/sales/calByTime", {
          params:{
            date:this.usedDate,
            type:"weekly"
          }
        }).then(response=>{
          let re = response.data.data;
          for (let i = 0;i < this.timerange.length;i++){
            this.everySales[i] = re[2*i].toFixed(2);
            this.everyadSpending[i] = re[2*i+1].toFixed(2);
          }
          this.demo();
        }).catch(e=>{

        });
          }else if(this.model1=='Monthly'){
              this.timerange=[];
              this.timerange[5] = this.currentDate.getMonth()+1;
              for (let i = 4;i >= 0;i--){
                this.timerange[i] = this.timerange[i+1] - 1;
                if (this.timerange[i] < 1) this.timerange[i] += 12;
              }
        axios.get("/seller/sales/calByTime", {
          params:{
            date:this.usedDate,
            type:"monthly"
          }
        }).then(response=>{
          let re = response.data.data;
          for (let i = 0;i < this.timerange.length;i++){
            this.everySales[i] = re[2*i].toFixed(2);
            this.everyadSpending[i] = re[2*i+1].toFixed(2);
          }
          this.demo();
        }).catch(e=>{

        });
          }else{
            this.timerange=[];
            this.timerange[4] = this.currentDate.getFullYear();
            for (let i = 3;i >= 0;i--){
              this.timerange[i] = this.timerange[i+1]-1;
            }
        axios.get("/seller/sales/calByTime", {
          params:{
            date:this.usedDate,
            type:"yearly"
          }
        }).then(response=>{
          let re = response.data.data;
          for (let i = 0;i < this.timerange.length;i++){
            this.everySales[i] = re[2*i];
            this.everyadSpending[i] = re[2*i+1];
          }
          this.demo();
        }).catch(e=>{

        });

          }

      this.demo();
     },
    demo() {
      var demo = this.$echarts.init(document.getElementById("demo"));
      var option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['totalSales','adSpending'],
        width:'80%',
        height:'80%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.timerange,
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'totalSales',
            type:'line',
            stack: 'everySales',
            data:this.everySales
        },
        {
            name:'adSpending',
            type:'line',
            stack: 'ereryADSpending',
            data:this.everyadSpending
        }

    ]
};


      demo.setOption(option);
    }
  }
};
</script>


