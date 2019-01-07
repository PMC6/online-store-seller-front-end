<template>
  <div>
    <Upload
      style="width:200px;margin: 0 0 0 150px; height: 10px"
      :on-success="handleSuccess"
      type="drag"
      name="name"
      :show-upload-list="flag"
      action="http://39.98.165.19:8080/advertisement/upload">
      <div style="padding: 0 0">
        <Icon type="ios-cloud-upload" size="40" style="color: #3399ff"></Icon>
        <p>Upload Image</p>
      </div>
    </Upload>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        flag: true
      }
    },
    methods: {
      handleSuccess (res) {
        this.$parent.image = res.data;
      }
    }
  }
</script>

<style scoped>
</style>
