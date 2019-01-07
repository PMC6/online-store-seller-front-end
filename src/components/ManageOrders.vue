<template>
<!-- 管理订单 -->
<div>
    <ordertable v-show="ordershow"></ordertable>
</div>
</template>
<script>
import ordertable from '@/components/orderTable'
export default {
    data(){
        return {
            ordershow:true
        }
    },
    components:{
        ordertable
    }
}
</script>

 


