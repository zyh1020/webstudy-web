<template>
    <div class="webCarousel">
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,index) in swiperList" :key="index+''">
                <img :src="item.img" class="swiperImg">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "Carousel",
        data(){
            return {
                swiperList: [{
                    img:'https://img.mukewang.com/5d1e0a1800013ca916000540.jpg'
                },{
                    img:'https://img.mukewang.com/5d1e0a1800013ca916000540.jpg'
                },{
                    img:'https://img.mukewang.com/5d1e0a1800013ca916000540.jpg'
                }],
            }
        }

    }
</script>

<style scoped>

    .webCarousel{
        position: absolute;
        left: 216px;
        top: 0;
        right: 0;
    }
    .swiperImg{
        display: block;
        width: 100%;
        height: 316px;
        border-top-right-radius: 8px;
    }

</style>
