<template>
<!-- 广告页的头部 -->
    <div class="div1">
        <Menu mode="horizontal" :theme="theme1" active-name="1"  @on-select="handleMenuItemClick" :accordion="true" 
            :open-names="['1']">
        <MenuItem :name="1" to="/advertise/advertisehomepage">
            <Icon type="ios-paper" />
            Homepage
        </MenuItem>
        <MenuItem :name="2" to="/advertise/allproducts">
            <Icon type="ios-people" />
            Allproducts
        </MenuItem>
        </Menu>
    </div>
</template>
<script>
export default {
    data(){
        return {
             theme1: 'primary'
        }
    },
    methods:{
        handleMenuItemClick(name){
                this.$emit('changePath',name)
            },
         
    }
}
</script>

<style scoped>
.div1{
    width:100%;
}
Menu{
    width:100%;
}
.ivu-menu{
    background-color: #fff;
}
    .ivu-menu-item{
        width:50%;
        text-align: center;
       
    }
    .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item-active, 
    .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover{
        background-color: rgba(94, 153, 231, 0.6);
    }
     .ivu-menu-item-active,.ivu-menu-item-selected{
         background-color: rgba(173, 236, 26, 0.6);
     }
     .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item{
         color:#000;
         border-bottom: 1px solid rgba(188, 199, 28, 0.6);
         
     }
</style>
