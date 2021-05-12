<template>
    <div class="question">
        <!-- 头部 -->
        <div class="question-header">
            <div class="question-search">
                <img src="https://www.imooc.com/static/img/wenda/wenda-logo.png" alt="">
                <div class="search-box">
                    <input type="text" v-model="problemTitle" placeholder="请输入你的问题">
                    <i class="iconfont el-icon-search" @click="searchQuestion"></i>
                </div>
                <div class="search-btn" @click="showAddProblemDialog">
                    提问
                </div>
            </div>
            <div class="question-nav">
                <dl>
                    <dt>问题分类：</dt>
                    <dd
                            v-for="(item, index) in sortList"
                            :key="index"
                            :class="{
                                    active: item.id == sortId
                             }"
                            @click="handleLikeClick(item)"
                    >
                        {{ item.name }}
                    </dd>
                </dl>
            </div>
        </div>

        <!-- 列表部分 -->
        <div class="m-center">
            <div class="question-content-container">
                <div class="question-list">
                    <ul v-if="questionList && questionList.length">
                        <li v-for="(item, index) in questionList" :key="index" class="question-item">
                            <div class="finish">
                                <!-- 是否解决了 -->
                                <span v-if="index % 2 == 0" class="iconfont el-icon-check"></span>
                                <span v-else>?</span>
                            </div>
                            <div class="content-box">
                                <!-- 问题的标题 -->
                                <h3 class="title" @click="toProblemDetils(item)">
                                    {{ item.problemTitle }}
                                </h3>
                                <p class="tag">
                                    <span class="name" >分类:</span>
                                    <span class="name" >{{ item.twoLevelSortName }}</span>
                                    <span class="view-box">
                                      <i class="iconfont el-icon-view"></i>
                                        &nbsp
                                       <span class="view-number">{{ item.lookNum }}</span>
                                    </span>
                                </p>
                            </div>
                        </li>
                    </ul>
                   <!-- <empty v-else message="暂无相关猿问数据"></empty>-->
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

            </div>

        </div>

        <!-- 添加问题对话框 -->
        <el-dialog
                title="添加问题"
                :visible.sync="addProblemDialogVisible"
                width="40%">
            <el-form ref="form" :model="problem" label-width="85px">
                    <el-form-item label="问题标题：">
                        <el-input v-model="problem.problemTitle"/>
                    </el-form-item>
                    <el-form-item label="问题分类：">
                        <el-select v-model="problem.sortId" placeholder="请选择分类">
                            <el-option :label="sort.name" :value="sort.id" v-for="(sort,index) in twoLevelSorts" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问题描述：">
                        <el-input type="textarea" v-model="problem.problemContent" :rows="8"></el-input>
                    </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button @click="addProblemDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProblem">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {getAllCategoryList} from '@/api/sort/category'
    import {addOneProblem,findPageProblems} from '@/api/question/problem'

    export default {
        name: "index",
        data(){
            return{
                page:1,
                limit:5,
                total:0,
                addProblemDialogVisible: false, //添加问题对话框
                allSorts:[], // 分类列表
                sortList:[],// 筛选问题的分类列表
                twoLevelSorts:[], // 所有的二级分类
                sortId:-1,//当前选中的分类id
                problemTitle:'',// 当前问题标题
                problem:{}, // 添加问题
                problemFilter:{sortId:null,problemTitle:null},// 筛选问题条件
                questionList:[] // 问题列表
            }
        },
        methods:{
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
                this.sortList = [];
                this.sortList.push({name:'全部',id:-1});
                this.twoLevelSorts = [];
                for(let sort of this.allSorts){
                    if(sort.level == 2){
                        this.twoLevelSorts.push(sort);
                        this.sortList.push(sort);
                    }
                }
            },
            // 点击问题
            toProblemDetils(problem){
                this.$router.push({
                    path:'/questionDetail',
                    query:{ problemId: problem.id}
                })
            },
            // 改变分页
            pageChange(pageNum){
                this.page = pageNum;
                // 重新获取问题列表
                this.getPageProblems();
            },
            // 添加问题对话框
            async showAddProblemDialog(){
                // ①，获取用户
                let token = window.sessionStorage.getItem("token");
                if(token){
                    if(this.twoLevelSorts.length <= 0){
                        await this.getSortList();
                    }
                    this.addProblemDialogVisible = true;
                }else {
                    this.$message.error('尚未登录，请先登录！');
                }

            },
            // 添加问题
            addProblem(){
                addOneProblem(this.problem).then(response =>{
                    if(response){
                        // 从新获取数据
                        this.addProblemDialogVisible = false;
                        // 重新获取问题列表
                        this.getPageProblems();
                    }
                })
            },
            // 点击搜索问题
            searchQuestion(){
                this.page = 1;
                // 重新获取问题列表
                this.getPageProblems();
            },
            // 更改标签类型
            handleLikeClick(item){
                this.sortId = item.id;
                this.page = 1;
                // 重新获取问题列表
                this.getPageProblems();
            },
            // 获取问题列表
            getPageProblems(){
                this.problemFilter.sortId = null;
                this.problemFilter.title = '';
                if(this.sortId != -1){
                    this.problemFilter.sortId = this.sortId;
                }
                if(this.problemTitle.trim() != ''){
                    this.problemFilter.problemTitle = this.problemTitle;
                }
                findPageProblems(this.page,this.limit,this.problemFilter).then( response => {
                    if(response){
                        this.questionList = response.data.problems;
                        this.total = response.data.total;
                    }
                });
            }
        },
        created() {
            // 查询所有分类
            this.getSortList();
            // 获取问题列表
            this.getPageProblems();
        }
    }
</script>

<style lang="stylus" scoped>
    .footerPage{
        margin: 30px auto;
    }
    .m-center
        margin: 0 auto;
        width: 1152px;
    .question
        padding: 20px 0 50px;
        .question-header
            margin: 0 auto;
            width: 1152px;
            .question-search
                position: relative;
                padding-right: 75px;
                background-color: #fff;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                & > img
                    width: 300px;
                    height: 60px;
                .search-box
                    float: right;
                    position: relative;
                    margin-top: 16px;
                    width: 480px;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 8px;
                    background-color: #eff1f0;
                    & > input
                        padding: 0 60px 0 10px;
                        width: 100%;
                        height: 36px;
                        outline: none;
                        background: none;
                        box-sizing: border-box;
                        color: #9199a1;
                        font-size: 14px;
                    .iconfont
                        display: inline-block;
                        position: absolute;
                        top: 10px;
                        right: 20px;
                        font-size: 20px;
                        font-weight: 700;
                        color: #9199a1;
                        cursor: pointer;
                .search-btn
                    position: absolute;
                    right: 0;
                    top: 16px;
                    padding: 7px 16px;
                    background-color: #1fad4e;
                    border-radius: 18px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 24px;
                    cursor: pointer;
                    &:hover
                        background-color: #17823b;
            .question-nav
                position: relative;
                padding: 18px 0;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                dt, dd
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 20px;
                    font-size: 14px;
                    line-height: 24px;
                dd
                    cursor: pointer;
                    &:hover, &.active
                        color: #06b571;
        .question-content-container
            margin-top: 30px;
            .question-list
                padding: 28px 32px;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 4px 8px 2px rgba(7,17,27,.1)
                .question-item
                    display: flex;
                    align-items: center;
                    padding: 16px 0;
                    border-bottom: 1px solid rgba(7,17,27,0.1);
                    &:last-child
                        border-bottom: none;
                    .finish
                        flex: 0 0 40px;
                        width: 40px;
                        padding: 8px 0;
                        margin-right: 15px;
                        background-color: rgba(31,173,78,.1);
                        color: #17823b;
                        & > span
                            display: block;
                            text-align: center;
                            line-height: 18px;
                            font-size: 16px;
                            font-weight: 700;
                            &:last-child
                                font-weight: 400;
                                font-size: 14px;
                    .content-box
                        flex: 1;
                        .title
                            margin-bottom: 4px;
                            font-size: 16px;
                            color: #1c1f21;
                            font-weight: 700;
                            line-height: 24px;
                            cursor: pointer;
                            &:hover
                                color: #1fad4e;
                        .tag
                            font-size: 12px;
                            color: #9199a1;
                            & > img
                                display: inline-block;
                                vertical-align: middle;
                                margin-top: -2px;
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                            & > span
                                display: inline-block;
                                vertical-align: middle;
                                &.name
                                    padding: 0 10px 0 5px;
                                &.view-box
                                    padding-left: 10px;
                                    & > i, & > span
                                        display: inline-block;
                                        vertical-align: middle;
            .list-empty
                padding: 10px 0;
                text-align: center;
                font-size: 14px;
                color: #f01414;
        .label-container
            padding-left: 20px;
        .label-group
            display: inline-block;
            vertical-align: top;
            margin-bottom: 18px;
            width: 250px;
            &:nth-child(2n + 1)
                margin-right: 20px;
            .label-group-title
                margin-bottom: 18px;
                font-size: 14px;
                color: #06b571;
                font-weight: bold;
            .label-item
                display: inline-block;
                vertical-align: middle;
                margin-right: 8px;
                margin-bottom: 8px;
                padding: 8px 16px;
                border-radius: 16px;
                background-color: rgba(28,31,33,.08);
                line-height: 16px;
                cursor: pointer;
                transition: all 0.3s;
                &:hover, &.is-active
                    color: #fff;
                    background-color: #06b571;
        >>> .mooc-dialog
            .mooc-dialog-body
                padding-top: 20px;
            .mooc-dialog-footer
                text-align: center;
                .mooc-button
                    width: 200px;
                    border-radius: 24px;
            .el-scrollbar
                height: 360px;
</style>
