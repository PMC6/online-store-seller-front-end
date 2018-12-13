<template>
  <div>
    <div class="rules-s">
      <div style="width:80%;margin:10px auto;">
      <p>1, I have opened a shop in PARKnSHOP, I use other people's identity card to open a shop can?</p>
      <p>
        A: no.Without the consent of PARKnSHOP platform, I will provide my PARKnSHOP account to others for store opening;
        otherwise, I will bear all the civil, administrative and criminal liabilities for any disputes,
        lawsuits and damages to my personal and property rights and interests caused by illegal behaviors in store operation.
      </p>
      <p>2,Can I sublet the shop to someone else?</p>
      <p>
        A: no.Without the consent of PARKnSHOP platform, I will provide my PARKnSHOP account to others for store opening; otherwise, I will bear all the civil, administrative and criminal liabilities for any disputes, lawsuits and damages to my personal and
        property rights and interests caused by illegal behaviors in store operation.
      </p>
      <p>3,Can I open more than one PARKnSHOP store?</p>
      <p>
        A: no.Without the consent of PARKnSHOP platform, I will provide my PARKnSHOP account to others for store opening;
        otherwise, I will bear all the civil, administrative and criminal liabilities for any disputes,
        lawsuits and damages to my personal and property rights and interests caused by illegal behaviors in store operation.
      </p>
      <p>4. I have opened a PARKnSHOP shop, now I want to cancel the original shop and open a new one, is that ok?</p>
      <p>A: can't, PARKnSHOP does not provide the service that cancels a shop temporarily.Users can no longer open another PARKnSHOP store with their id card (business license) once they have successfully set up shop.</p>
    </div>
    </div>
    <div class="agreeBtn">
      <span>I have read and agreed to the above</span>
      <input type="checkbox" name id v-text="checked" @change="check">
      <input type="button" value="Continue" class="continueBtn" @click="toSecondstep">
    </div>
  </div>
</template>
<style scroped>
.rules-s {
  width: 80%;
  height: 400px;
  background-color: #fff;
  margin: 0 auto;
  overflow-y: scroll;
  border: 1px solid rgb(162, 144, 211);
}
.agreeBtn {
  margin-left: 20%;
  margin-top: 3%;
}
.continueBtn {
  background-color: rgba(141, 135, 221, 1);
  border: 1px solid rgba(141, 135, 221, 1);
  border-radius: 5%;
  margin-left: 5%;
}
</style>
<script>
import registersteps from "./registerSteps";
export default {
  data() {
    return {
      checked: false
    };
  },
  methods: {
    check() {
      this.checked = !this.checked;
    },

    toSecondstep() {
      if (this.checked == true) {
        this.$parent.ruleshow = false;
        this.$parent.sellershow = true;
        this.$parent.storeshow = false;
        this.$parent.completeshow = false;
        this.$parent.current = 1;
      } else {
        alert("plase read rules");
      }
    },
      sellerinfo() {

              axios.get('/api/seller/product/add', {
                  'sellername': this.sellername,
                  'image':this.image,

              }).then((response) => {
                  console.log(response)
              }).catch((err) => {
                  console.error('fuck')
              })

      },
  }
};
</script>


