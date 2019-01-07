<template>
<!-- 申请店铺步骤 -->
  <div>
    <div class="R-tips" >
      <Steps :current="current" class="steps-bgc" >
        <Step title="Read The Rules" content></Step>
        <Step title="Seller Information" content></Step>
        <Step title="Store Information" content></Step>
        <Step title="Complete" content></Step>
      </Steps>
    </div>
    <div>
      <rules v-show="ruleshow"></rules>
      <sellerinfors v-show="sellershow"></sellerinfors>
      <storeinfors v-show="storeshow"></storeinfors>
      <complete v-show="completeshow"></complete>
    </div>
  </div>
</template>
<style scoped>
.R-tips {
  margin-left: 4%;
  margin-top: 5%;
  font-weight: 400;
  display: block;
}
.steps-bgc {
  background-color: rgba(255, 255, 255, 0.9);
  width: 90%;
  height: 10%;
  margin: 5% auto;
}
.ivu-steps .ivu-steps-head {
  background-color: rgba(255, 255, 255, 0.9);
}
.ivu-steps .ivu-steps-title {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>

<script>
import rules from "./registerRules";
import sellerinfors from "./registerSellerInformation";
import storeinfors from "./registerStoreInfors";
import complete from "./registerComplete";
export default {
  data() {
    return {
      ruleshow: true,
      sellershow: false,
      storeshow: false,
      completeshow: false,
      current: 0
    };
  },
  components: {
    rules: rules,
    sellerinfors: sellerinfors,
    storeinfors: storeinfors,
    complete: complete
  }
};
</script>
