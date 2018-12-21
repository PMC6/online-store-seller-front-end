<template>
<!-- 轮番图 -->
    <div class="div2">
        <Carousel autoplay v-model="value2" loop >
        <CarouselItem>
            <div class="demo-carousel"><img src="../assets/huawei1.png"/></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="../assets/huawei2.png"/></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="../assets/huawei3.png"/></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="../assets/huawei.jpg"/></div>
        </CarouselItem>
    </Carousel>
    </div>
</template>
<style scoped>
.div2{
    width:100%;
    height:520px;
    overflow: hidden;
}
.div2 img{
    width:100%;
    height:100%;
}
</style>
<script>
export default {
    data(){
        return {
            value2:0
        }
    }
}
</script>

