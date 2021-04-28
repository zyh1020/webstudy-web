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
        <div class="course-nav">
            <dl>
                <dt>方向：</dt>
                <dd
                        v-for="(oneSort,index) in oneLevelSort"
                        :key="index"
                        :class="{active: oneSort.id == oneLevelSortId}"
                        @click="OneLevelSortClick(oneSort)"
                >
                    {{ oneSort.name }}
                </dd>
            </dl>

            <dl>
                <dt>分类：</dt>
                <dd
                        v-for="(twoSort,index) in currentTwoLevelSort"
                        :key="index"
                        :class="{active: twoSort.id == twoLevelSortId}"
                        @click="twoLevelSortClick(twoSort)"
                >
                    {{ twoSort.name }}
                </dd>
            </dl>

            <dl>
                <dt>难度：</dt>
                <dd
                        v-for="(diff,index) in diffList"
                        :key="index"
                        :class="{active: diff.id == diffId}"
                        @click="difficultyClick(diff)"
                >
                    {{ diff.name }}
                </dd>
            </dl>
        </div>
        <!-- 课程内容列表 -->
        <div class="course-list-wrapper">
            <!-- 课程筛选 -->
            <div class="course-filter">
              <span
                      v-for="(item,index) in filterList"
                      :key="index"
                      :class="{active: item.code == orderBy}"
                      @click="handleFilterClick(item)"
              >{{ item.title }}</span>
            </div>

            <!-- 课程列表 -->
            <ul v-if="courseList.length" class="course-list">
                <li v-for="(item,index) in courseList" :key="index" class="list-item" @click="handleCourseClick(item)">
                    <div class="img-box">
                        <img :src="item.courseCover" alt="">
                        <div class="tags">
                            <span class="tag-item">{{item.sortParentName}}/{{item.sortName}}</span>
                        </div>
                    </div>
                    <div class="course-content">
                        <h2 class="title ellipsis"> <!-- 标题 -->
                            {{ item.title }}
                        </h2>
                        <p>
                            <!-- 学习人数-->
                            <span class="number"><i class="iconfont el-icon-user-solid"></i>{{item.studyPersonNum}}</span>
                            <!-- 难度 -->
                            <el-rate v-model="item.difficulty" style="display: inline-block; margin-left: 5px" disabled></el-rate>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="empty-container" v-else>
                <img class="empty-img" src="@/assets/images/empty.jpg" alt="">
                <p class="empty-msg">
                    "暂无相关课程数据"
                </p>
            </div>
            <!-- 分页 -->
            <el-pagination
                    style="margin: 30px auto"
                    background
                    layout="prev, pager, next"
                    :current-page="page"
                    :page-size="limit"
                    :total="total"
                    @current-change="pageChange">
            </el-pagination>

        </div>
        <!-- 分页 -->

    </div>
</template>

<script>
    import {getAllCategoryList} from '@/api/sort/category'
    import {findCourseList} from '@/api/course/courseInfo'

    export default {
        name: "index",
        data(){
            return{
                allSorts:[], // 全部分类
                oneLevelSort:[], // 一级分类
                twoLevelSort:[], // 二级分类
                currentTwoLevelSort:[],// 当前二级分类
                oneLevelSortId:0,// 当前选中的一级分类
                twoLevelSortId:0,// 当前选中的二级分类
                diffList: [], // 难度数据列表
                diffId:0,// 当前难度
                isFocus: false,
                result: ['热门搜索','热门搜索','热门搜索'], // 热词
                isHide: false,
                filterList: [], // 排序方式
                orderBy: -1, // 当前排序方式
                courseList:[], // 课程列表
                courseFile:{
                    sortId:null,
                    sortParentId:null,
                    difficulty:null,
                    title:null
                }, // 查询课程条件
                page:0, // 当前页
                limit:10, // 多少页
                total:0 // 总记录
            }
        },
        methods: {
            // 获取分类列表
            getSortList(){
                getAllCategoryList().then(response => {
                    if(response){
                        this.allSorts = response.data;
                        // 筛选分类列表
                        this.getScreenSortList()
                    }
                })
            },
            // 筛选分类列表
            getScreenSortList(){
                this.oneLevelSort = [];
                this.twoLevelSort = [];
                this.oneLevelSort.push({id:0,parentId: 0, name: "全部", level: 1});
                this.twoLevelSort.push({id:0,parentId: 0, name: "全部", level: 2});
                for(let sort of this.allSorts){
                    if(sort.level == 1){
                        this.oneLevelSort.push(sort);
                    }
                    if(sort.level == 2){
                        this.twoLevelSort.push(sort);
                    }
                }
                this.currentTwoLevelSort = this.twoLevelSort;
            },
            // 排序方式点击
            handleFilterClick (item) {
                this.orderBy = item.code;
                if(this.orderBy == -1){
                    // 默认排序
                }
            },
            // 课程点击事件
            handleCourseClick (lesson) {
                this.$router.push({
                    path:'/courseDetail',
                    query:{ courseId:1 }})
            },
            // 点击一级分类
            OneLevelSortClick (sort) {
                this.oneLevelSortId = sort.id;
                this.twoLevelSortId = 0;
                this.currentTwoLevelSort = [];
               // ①，当前分类id
                if(sort.name == "全部"){
                    // ②，全部子分类
                    this.currentTwoLevelSort = this.twoLevelSort;
                }else {
                    this.currentTwoLevelSort.push({id:0,parentId: 0, name: "全部", level: 2});
                    // ②，根据sort查询字分类
                    for(let sortItem of this.twoLevelSort){ // 遍历所有的二级分类
                        if(sortItem.parentId == sort.id){ // 是一级分类的子分类
                            this.currentTwoLevelSort.push(sortItem);
                        }
                    }
                }


            },
            pageChange(){

            },
            // 点击二级分类赛选课程
            twoLevelSortClick(sort){
                // 二级分类id
                this.twoLevelSortId = sort.id;
                // 一级分类id
                if(sort.name != "全部"){
                    this.oneLevelSortId = sort.parentId;
                }
            },
            // 点击难度
            difficultyClick(diff){
                this.diffId = diff.id;
            },
            // 查询课程列表
            findPageCourseList(){
                if(this.oneLevelSortId == 0){
                    this.courseFile.sortParentId = null;
                }else{
                    this.courseFile.sortParentId = this.oneLevelSortId;
                }
                if(this.twoLevelSortId == 0){
                    this.courseFile.sortId = null;
                }else{
                    this.courseFile.sortId = this.twoLevelSortId;
                }
                if(this.diffId == 0){
                    this.courseFile.difficulty = null;
                }else{
                    this.courseFile.difficulty = this.twoLevelSortId;
                }
                findCourseList(this.page,this.limit,this.orderBy,this.courseFile).then(response =>{
                    if(response){
                        this.courseList = response.data.courses;
                    }
                })
            }
        },
        created () {
            this.filterList = [
                { title: '默认排序', code: -1},
                { title: '最新', code: 0},
                { title: '最热', code: 1}
            ];
            this.diffList = [
                { name: '全部', id: 0 },
                { name: '入门', id: 1 },
                { name: '初级', id: 2 },
                { name: '中级', id: 3 },
                { name: '高级', id: 4 }
            ];
            // 获取分类列表
            this.getSortList();
            // 查询课程列表
            this.findPageCourseList();
        }
    }
</script>
<style lang="stylus" scoped>
    /* 导航*/
    .course-nav
        dl
            position: relative;
            padding: 16px 0 10px 52px;
            border-bottom: 1px solid #eff1f0;
            font-size: 14px;
            dt
                position: absolute;
                left: 0;
                top: 22px;
                color: #1c1f21
                font-weight: 700;
            dd
                display: inline-block;
                padding: 0 10px;
                margin: 0 5px 10px 0;
                height: 30px;
                line-height: 30px;
                color: #1c1f21;
                cursor: pointer;
                &.active
                    background-color: rgba(242,13,13,.06);
                    border-radius: 6px;
                    color: #f01414;
                    font-weight: 700;
                &:hover
                    color: #f01414;

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


    .course-list-wrapper
        .course-filter
            padding: 26px 20px 16px 0;
            & > span
                display: inline-block;
                margin-right: 12px;
                padding: 4px 12px;
                color: #1c1f21
                font-size: 14px;
                cursor: pointer;
                &.active
                    background-color: #9199a1;
                    color: #fff;
                    border-radius: 12px;
        .course-list
            padding: 10px 0 20px;
            .list-item
                display: inline-block;
                margin: 0 15px 25px 0;
                vertical-align: top;
                cursor: pointer;
                width: 240px;
                &:hover
                    .course-content
                        .title
                            color: #f01414;
                .img-box
                    position: relative;
                    img-box(216px, 120px);
                    & > img
                        height: 135px;
                        width: 240px;
                        border-radius: 8px;
                    .tags
                        position: absolute;
                        left: 8px;
                        bottom: 6px;
                        .tag-item
                            display: inline-block;
                            margin-right: 5px;
                            padding: 4px 8px;
                            background-color: rgba(28,31,33,.6);
                            border-radius: 2px;
                            font-size: 12px;
                            color: #fff;

                .course-content
                    padding: 8px;
                    .title
                        line-height: 24px;
                        font-size: 16px;
                        font-weight: 700;
                        color: #1c1f21;
                    & > p
                        font-size: 12px;
                        color: #9199a1;
                        line-height: 24px;
                        .rank
                            margin-right: 10px;
                        .number
                            .iconfont
                                font-weight: 700;


    .empty-container
        padding: 30px 0;
        min-height: 300px;
        text-align: center;
        .empty-msg
            line-height: 24px;
            font-size: 16px;
            color: #f01414;

</style>
