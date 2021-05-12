<template>
    <div class="home">
        <!-- 背景阴影 -->
        <!-- 导航和轮播 -->
        <div class="home-container">
            <!-- 侧边导航 -->
            <nav-left-side/>
            <!-- 轮播图-->
            <nav-banner></nav-banner>
            <!-- 右下方图 -->
            <nav-bottom-course/>
        </div>
        <!--  实战导航 -->
        <home-course-container :list="recommend" title="实／战／推／荐" type="recommend" :position="0" />
        <!-- 新上好课 -->
        <home-course-container :list="newcourse" title="新／上／好／课" type="new" :position="1" />
        <!-- 新手入门 -->
        <home-course-container :list="easy" title="新／手／入／门" type="easy" :position="2" />
        <!-- 技能提升 -->
        <home-course-container :list="improve" title="火／爆／课／程" type="improve" :position="3" />
        <!-- 前言技术 -->
        <home-course-container :list="advanced" title="前／沿／技／术" type="advanced" :position="4" />
    </div>
</template>
<script>
    import {findCourses} from '@/api/course/courseInfo'
    import NavLeftSide from './home/NavLeftSide'
    import NavBottomCourse from './home/NavBottomCourse'
    import NavBanner from './home/NavBanner'
    import HomeCourseContainer from './home/HomeCourseContainer'
    export default {
        name: 'Home',
        data(){
          return{
              recommend:[],
              newcourse:[],
              easy:[],
              improve:[],
              advanced:[]

          }
        },
        components: {
            NavLeftSide,
            NavBottomCourse,
            NavBanner,
            HomeCourseContainer
        },
        methods:{
            // 查询课程
            initPage(){
                findCourses('recommend',5).then(response => {
                    if(response){
                        this.recommend = response.data;
                    }
                });
                findCourses('new',10).then(response => {
                    if(response){
                        this.newcourse = response.data;
                    }
                });
                findCourses('easy',5).then(response => {
                    if(response){
                        this.easy = response.data;
                    }
                });
                findCourses('improve',8).then(response => {
                    if(response){
                        this.improve = response.data;
                    }
                });
                findCourses('advanced',10).then(response => {
                    if(response){
                        this.advanced = response.data;
                    }
                });
            }
        },
        created() {
            this.initPage();
         }
    }
</script>

<style scoped>

    .home{
        margin-top: 32px;
        min-height: 750px;
    }

    .home-container{
        position: relative;
        box-shadow: 0 12px 24px 0 rgba(7,17,27,0.1);
        border-radius: 8px;
        margin: 0 auto;
        width: 1152px;
    }

</style>
