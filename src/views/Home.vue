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
        <home-course-container :list="lessonData.recommend" title="实／战／推／荐" type="recommend" :position="0" />
        <!-- 新上好课 -->
        <home-course-container :list="lessonData.recommend" title="新／上／好／课" type="new" :position="1" />
        <!-- 新手入门 -->
        <home-course-container :list="lessonData.recommend" title="新／手／入／门" type="easy" :position="2" />
        <!-- 技能提升 -->
        <home-course-container :list="lessonData.recommend" title="技／能／提／升" type="improve" :position="3" />
        <!-- 前言技术 -->
        <home-course-container :list="lessonData.recommend" title="前／沿／技／术" type="advanced" :position="4" />
    </div>
</template>
<script>
    import NavLeftSide from './home/NavLeftSide'
    import NavBottomCourse from './home/NavBottomCourse'
    import NavBanner from './home/NavBanner'
    import HomeCourseContainer from './home/HomeCourseContainer'
    export default {
        name: 'Home',
        data(){
          return{
              lessonData:{
                  recommend:[
                      {
                          img:'https://img.mukewang.com/szimg/5d36a6000837a91d06000338-360-202.jpg',
                          process: 2,
                          title: '标题标题标题标题标题标题标题标题标题标题标题标题',
                          labels:['标签1','标签2'],
                          persons: 3,
                      },{
                          img:'https://img.mukewang.com/szimg/5d36a6000837a91d06000338-360-202.jpg',
                          process: 2,
                          title: '标题',
                          labels:['标签1','标签2'],
                          persons: 3,
                      },{
                          img:'https://img.mukewang.com/szimg/5d36a6000837a91d06000338-360-202.jpg',
                          process: 2,
                          title: '标题',
                          persons: 3,
                      }
                  ]
              }
          }
        },
        components: {
            NavLeftSide,
            NavBottomCourse,
            NavBanner,
            HomeCourseContainer
        },
        created() {
            window.sessionStorage.setItem("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2MTg2NTMyNjM0OTgsImV4cCI6MTYxODczOTY2M30.L6swEu2URiod_RW004qAhn345IhiyWMkR_xZ6gS_j_FAX5W_0IZVO4-vkcHX32REzbxp76JCd3rL-LJw-71jdw");
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
