<template>
    <div class="course mx-center">
        <!-- 搜索模块 -->
        <div class="course-search">
            <div class="search-tag">
                <img src="https://www.imooc.com/static/img/course/logo-course2.png" width="96" height="60" alt="">
                <!--<img src="https://www.imooc.com/static/img/course/course-top.png" width="80%" height="60" alt="">-->
            </div>
            <div class="search-wrapper">
                <input type="text" placeholder="搜索感兴趣的内容" @focus="isFocus=true" @blur="isFocus=false">
                <i class="iconfont el-icon-search"></i>
                <ul v-if="isFocus" class="search-result">
                    <li v-for="(item,index) in result" :key="index" class="result-item">
                        {{ item}}
                    </li>
                </ul>
            </div>
        </div>
        <!-- 导航 -->
        <course-nav></course-nav>

        <!-- 课程内容列表 -->
        <course-list :list="courseList"></course-list>
        <!-- 分页 -->
    </div>
</template>

<script>
    import CourseNav from '@/views/course/CourseNav'
    import CourseList from '@/views/course/CourseList'
    export default {
        name: "index",
        data(){
            return{
                isFocus: false,
                result: ['热门搜索','热门搜索','热门搜索'],
                courseList:[{
                    img:'https://img4.mukewang.com/529dc3380001379906000338-240-135.jpg',
                    labels:['html','css'],
                    title: 'HTML/CSS初识HTML',
                    value: 5,
                    introduction:'HTML(5)+CSS(3)基础教程8小时带领大家步步深入学习标签用法和意义'
                }]
            }

        },
        components:{
            CourseNav,
            CourseList
        }
    }
</script>
<style lang="stylus" scoped>
    .course
        padding-top: 20px;
        margin: 0 auto;
        width: 1386px
        .course-search
            padding: 12px 0;
            border-bottom: 1px solid #d0d6d9;
            .search-tag
                display: inline-block;
                & > img:nth-child(2)
                    margin-left: 16px;
    .search-wrapper
        position: relative;
        float: right;
        width: 466px;
        height: 60px;
        line-height: 60px;
        .iconfont
            position: absolute;
            right: 15px;
            top: 20px;
            font-size: 24px;
            color: #9199a1;
            cursor: pointer;
            line-height: 1;
        input
            padding: 0 16px;
            width: 100%;
            height: 36px;
            box-sizing: border-box;
            line-height: 36px;
            border-radius: 5px;
            outline: none;
            background: #f3f5f6;
            font-size: 14px;
            color: #1c1f21;
        .search-result
            z-index: 99;
            position: absolute;
            left: 0;
            top: 52px;
            right: 0;
            background-color: #fff;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            box-shadow: 0 4px 8px 0px rgba(7,17,27,0.1);
            .result-item
                padding-left: 20px;
                line-height: 50px;
                color: #1c1f21;
                cursor: pointer;
                font-size: 14px;
                &:hover
                    background: #f3f5f6;

</style>
