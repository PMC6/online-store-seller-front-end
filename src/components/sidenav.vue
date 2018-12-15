<template>
  <Row>
    <Col span="8">
      <Menu>
        <MenuItem name="1-2">My Shop</MenuItem>
        <MenuItem name="1-3">Manage Products</MenuItem>

        <MenuItem name="2-1">Manage</MenuItem>
        <MenuItem name="2-2">Manage Advertisement</MenuItem>

        <MenuItem name="3-1">Sales History</MenuItem>
        <MenuItem name="3-2">Shop Income</MenuItem>
        <MenuItem name="3-3">Evaluation View</MenuItem>
      </Menu>
    </Col>
  </Row>
</template>
  
<style scoped>
@keyframes slideToBottom {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, 100%);
  }
}
.ivu-menu-item {
  border: 1px solid #ccc;
}
.ivu-menu-item {
  color: #000;
}
.ivu-row {
  margin: 15px;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background-color: rgba(125, 140, 218, 0.9);
  color: #000;
}
</style>
<script>
import { ROUTERS } from "../myConfig.js";

export default {
  //   name: "Sidebar",
  //   data() {
  //     let data = JSON.parse(JSON.stringify(ROUTERS)); //避免改变config的值
  //     return {
  //       theme2: "dark",
  //       routers: data
  //     };
  //   },
  //   mounted: function() {
  //     this.handleMenuItemClick(this.routers.listSeller);
  //   },
  //   methods: {
  //     handleMenuItemClick(name) {
  //       this.$emit("changePath", name);
  //     }
  //   }
};
</script>
