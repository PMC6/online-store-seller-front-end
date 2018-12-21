<template>
    <div class="navbar-right ">
       
        <registershopb v-show="buttonshow"></registershopb>
       
        <div v-show='isShow'>
           <registersteps></registersteps>
        </div>

       
        
    </div>
</template>
<style scoped>
    .navbar-right{
        height:100%;
         background-color:rgba(255, 255, 255,0.9);
         width:100%;
         border:1px solid #ccc;
         border-radius: 1%;
    }
    
</style>
<script>
    import registershopBtn from './registerShopButton'
    import registersteps from './registerSteps'

    export default {
        data(){
            return {
                isShow:false,
                buttonshow:true

            }
        },
        components:{
            'registershopb':registershopBtn,
            'registersteps':registersteps
            
        }
    }
</script>


