<template>
  <Upload :on-success="handleSuccess"
          action="http://39.98.165.19:8080/advertisement/upload">
    <Button icon="ios-cloud-upload-outline">Upload files</Button>
  </Upload>
</template>

<script>
    export default {
      name: "addProductImg",
      methods: {
        handleSuccess (res) {
          alert(this.$parent.image);
          this.$parent.image = res.data;
        }
      }
    }
</script>

<style scoped>

</style>

