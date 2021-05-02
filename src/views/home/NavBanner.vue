<template>
    <div class="webCarousel">
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,index) in swiperList" :key="index+''">
                <img :src="item.imgUrl" class="swiperImg">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import {getAllBanners} from '@/api/banner/banner'
    export default {
        name: "Carousel",
        data(){
            return {
                swiperList: [],
            }
        },
        methods:{
            findAllBanners(){
                getAllBanners().then(response => {
                    if(response){
                        this.swiperList = response.data;
                    }
                })
            }

        },
        created() {
            // 查询所有的banner
            this.findAllBanners();

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
