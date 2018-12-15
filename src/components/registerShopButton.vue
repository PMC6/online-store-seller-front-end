<template>
<div >
    
    <button type="button" class="btn btn-default btn-lg" @click="ruleshow" >Register New Shop</button>
</div>
    
</template>
<script>
export default {
    methods:{
        ruleshow(){
            this.$parent.isShow=true;
            this.$parent.buttonshow=false;
        }
    }
}
</script>


<style scoped>
div{
    width:200px;
    height:200px;
 margin:15% auto;
 
}
    
    .btn{
        width:200px;
        height:200px;
        background-color: rgba(72, 146, 206, 0.5);
       border-radius: 50%;
       
    }
    .btn:hover{
        background-color: rgba(10, 54, 90, 0.5);
    }
</style>


