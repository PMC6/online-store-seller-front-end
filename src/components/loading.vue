
<template>
<!-- 等待 -->
    <div class="div1">
        <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
    </div>
            
     
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .div1{
        position: absolute;
        top:100px;
        left:300px;
        z-index: 10;
    }
</style>