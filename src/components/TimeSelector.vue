<template>
  <Row>
    <Col span="12" style="fontSize:12px">
      <DatePicker type="date" placeholder="Select date" style="width: 200px" @on-change="test"></DatePicker>
    </Col>
  </Row>
</template>
<script>
  import bus from "./bus"

  export default {
    name: "TimeSelector",
    data(){
      return{
      }
    },
    methods:{
      test(item){
        bus.$emit("timeSelect", item);
      }
    },
  }
</script>
<style scoped>

</style>
