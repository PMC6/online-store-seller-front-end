<template>
    <button type="button" class="btn btn-default btn-lg" @click="ruleshow" >Register New Shop</button>
</template>
<script>
export default {
    methods:{
        ruleshow(){
            this.$parent.isShow=true;
        }
    }
}
</script>


<style scroped>
    .btn{
        width:22%;
        height:5%;
        background-color: rgba(156, 143, 202, 0.945);
        margin-top:8%;
        margin-left:4%;
    }
</style>


