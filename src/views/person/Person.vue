<template>
    <div class="person">
        <el-card class="content">
            <el-tabs tab-position="left" v-model="activeId" class="tabContent">
                <el-tab-pane label="个人信息" name="personal">
                    <div id="contentHeader">
                        <el-divider content-position="left">头像信息</el-divider>
                        <el-upload
                                class="avatar-uploader"
                                action="/api/ali/oss/uploadImage"
                                :show-file-list="false"
                                :headers="headers"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="userInfo.userAvatar" :src="userInfo.userAvatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-divider content-position="left">基础信息</el-divider>
                        <el-form ref="form" :inline="true" :model="userInfo" label-width="80px">
                            <el-form-item label="用户昵称">
                                <el-input v-model="userInfo.name" :disabled="isLock"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="clickLocking">{{isLock ? '解锁':'锁定'}}</el-button>
                        <el-button type="success" @click="updateUser">修改</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="课程管理" name="courses">
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="问题管理" name="questions">
                    <el-tabs type="card" v-model="activeQuestionsId">
                        <el-tab-pane label="问题" name="first">
                            <el-table
                                    :data="problems"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        label="标题"
                                        width="200">
                                    <template slot-scope="scope">
                                        <el-link type="primary" @click="clickProblem(scope.row)">{{scope.row.problemTitle}}</el-link>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="twoLevelSortName"
                                        label="分类">
                                </el-table-column>
                                <el-table-column
                                        prop="lookNum"
                                        label="浏览量">
                                </el-table-column>
                                <el-table-column
                                        label="最新时间"
                                        width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.updateTime | formatDate}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button size="mini" @click="handleEditProblem(scope.row)">编辑</el-button>
                                        <el-button size="mini" type="danger" @click="handleDeleteProblem(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination
                                    style="margin: 30px auto"
                                    background
                                    layout="prev, pager, next"
                                    :current-page="prPage"
                                    :page-size="pageSize"
                                    :total="prTotal"
                                    @current-change="pageProblemChange">
                            </el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="回答" name="second">
                            <el-table
                                    :data="answers"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        label="所属问题"
                                        width="180">
                                    <template slot-scope="scope">
                                        <el-link type="primary" @click="clickProblem(scope.row.problem)">{{scope.row.problem.problemTitle}}</el-link>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="我的回答"
                                        prop="answerContent"
                                        width="350">
                                </el-table-column>
                                <el-table-column
                                        label="最新时间"
                                        width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.updateTime | formatDate}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button size="mini" @click="handleEditAnswer(scope.row)">编辑</el-button>
                                        <el-button size="mini" type="danger" @click="handleDeleteAnswer(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination
                                    style="margin: 30px auto"
                                    background
                                    layout="prev, pager, next"
                                    :current-page="anPage"
                                    :page-size="pageSize"
                                    :total="anTotal"
                                    @current-change="pageAnswerChange">
                            </el-pagination>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="文章管理" name="articles">
                    <el-table
                            :data="article"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                label="标题"
                                width="280">
                            <template slot-scope="scope">
                                <el-link type="primary" @click="clickArticle(scope.row)">{{scope.row.articleTitle}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="sortName"
                                label="分类">
                        </el-table-column>
                        <el-table-column
                                prop="lookNum"
                                label="浏览量">
                        </el-table-column>
                        <el-table-column
                                label="状态">
                            <template slot-scope="scope">
                                {{scope.row.isPulish == 0 ? '未发布':'已发布'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEditArticle(scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDeleteArticle(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-pagination
                            style="margin: 30px auto"
                            background
                            layout="prev, pager, next"
                            :current-page="arPage"
                            :page-size="pageSize"
                            :total="arTotal"
                            @current-change="pageArticleChange">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 修改问题对话框 -->
        <el-dialog
                title="修改问题"
                :visible.sync="updateProblemDialogVisible"
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
                <el-button @click="updateProblemDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateProblem">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改答案对话框 -->
        <el-dialog
                title="修改答案"
                :visible.sync="updateAnswerVisible"
                width="30%">
            <el-input type="textarea" v-model="answer.answerContent" :rows="8">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateAnswerVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAnswer">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getPersonOfActicles,deleteArticleById} from '@/api/article/article'
    import {findPersonOfQuestions,updateOneProblem,deleteOneProblem} from '@/api/question/problem'
    import {getAllCategoryList} from '@/api/sort/category'
    import {getPersonOfAnswers,updateAnswer,deleteAnswer} from '@/api/question/answer'
    import {userInfo,updateUserHeard,updateUserInfo} from '@/api/user/user'
    export default {
        name: "Person",
        filters:{
            formatDate(date){
                let dt = new Date(date);
                const y = dt.getFullYear();
                const m = (dt.getMonth() + 1 + '').padStart(2,'0');
                const d = (dt.getDate() +'').padStart(2,'0');
                const hh = (dt.getHours() + '').padStart(2,'0');
                const mm = (dt.getMinutes() + '').padStart(2,'0');
                const ss = (dt.getSeconds() + '').padStart(2,'0');
                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;

            }
        },
        data() {
            return {
                headers:{
                    token: window.sessionStorage.getItem('token')
                },
                isLock: true, // 锁定
                pageSize:1,
                allSorts:[], // 分类列表
                oneLevelSorts:[],// 所有的一级分类
                twoLevelSorts:[], // 所有的二级分类
                activeQuestionsId:'first',
                activeId:'personal',
                // 用户
                userInfo:{},
                updateUserInfo:{},
                // 回答
                anPage:1,
                anTotal:0,
                answers:[],
                updateAnswerVisible:false,// 修改
                answer:{},
                // 问题
                prPage:1,
                prTotal:0,
                problems:[],
                updateProblemDialogVisible:false, // 弹框
                problem:{}, // 修改存储
                // 文章
                arPage:1,
                arTotal:0,
                article:[],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
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
                this.oneLevelSorts = [];
                this.twoLevelSorts = [];
                for(let sort of this.allSorts){
                    if(sort.level == 2){
                        this.twoLevelSorts.push(sort);
                    }else if(sort.level == 1){
                        this.oneLevelSorts.push(sort);
                    }
                }
            },
            // 锁定
            clickLocking(){
                this.isLock = !this.isLock;
            },
            // 查询个人信息
            getUserInfo(){
                userInfo().then(response =>{
                     this.userInfo =response.data;
                });
            },
            handleAvatarSuccess(res, file) {
                // 保存图片地址
                // 修改值
                this.updateUserInfo.id = this.userInfo.id;
                this.updateUserInfo.userAvatar = res.data;
                updateUserHeard(this.updateUserInfo).then(response =>{
                    if(response){
                        // 查询个人信息
                        this.getUserInfo();
                    }
                });
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 修改用户的基本信息
            updateUser(){
                this.updateUserInfo.id = this.userInfo.id;
                this.updateUserInfo.name = this.userInfo.name;
                updateUserInfo(this.updateUserInfo).then(response =>{
                    if(response){
                        // 查询个人信息
                        this.getUserInfo();
                    }
                });
            },
            // 查询答案
            getPersonOfAnswers(){
                getPersonOfAnswers(this.anPage,this.pageSize).then(response => {
                    if(response){
                        this.answers = response.data.answers;
                        this.anTotal = response.data.total;
                    }
                });
            },
            // 删除答案
            handleDeleteAnswer(answer){
                this.$confirm('此操作将永久删除该答案是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除答案
                    deleteAnswer(answer.id).then(response =>{
                        if(response){
                            // 查询答案
                            this.getPersonOfAnswers();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 编辑答案
            handleEditAnswer(answer){
                this.answer = answer;
                this.updateAnswerVisible = true;
            },
            // 修改答案
            updateAnswer(){
                updateAnswer(this.answer).then(response =>{
                    if(response){
                        // 查询答案
                        this.getPersonOfAnswers();
                        this.updateAnswerVisible = false;
                    }
                });
            },
            // 答案分页改变
            pageAnswerChange(pageNum){
                this.anPage = pageNum;
                // 查询答案
                this.getPersonOfAnswers();
            },
            // 查询问题
            getProblems(){
                findPersonOfQuestions(this.prPage,this.pageSize).then(response => {
                        if(response){
                            this.problems = response.data.problems;
                            this.prTotal = response.data.total;
                        }
                });
            },
            // 查看问题详情
            clickProblem(problem){
                this.$router.push({path:"/questionDetail",query:{problemId:problem.id}});
            },
            // 编辑问题
            handleEditProblem(problem){
                // 查询问题
                this.problem = problem;
                this.updateProblemDialogVisible = true;
            },
            // 修改问题
            updateProblem(){
                updateOneProblem(this.problem).then(response =>{
                    if(response){
                        // 查询问题
                        this.getProblems();
                        this.updateProblemDialogVisible = false;
                    }
                });
            },
            // 删除问题
            handleDeleteProblem(problem){
                this.$confirm('此操作将永久删除<'+problem.problemTitle+'> 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteOneProblem(problem.id).then(response =>{
                        if(response){
                            // 查询问题
                            this.getProblems();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 分页改变
            pageProblemChange(pageNum){
                this.prPage = pageNum;
                // 查询问题
                this.getProblems()
            },
            // 获取文章
            getActicles(){
                getPersonOfActicles(this.arPage,this.pageSize).then(response =>{
                    if(response){
                        this.article = response.data.articles;
                        this.arTotal = response.data.total;
                    }
                });

            },
            // 修改文章
            handleEditArticle(article){
                this.$router.push({path:"/addOrUpdteArticle",query:{articleId:article.id}});
            },
            // 删除文章
            handleDeleteArticle(article){
                this.$confirm('此操作将永久删除<'+article.articleTitle+'> 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteArticleById(article.id).then(response =>{
                        if(response){
                            // 重新获取文章
                            this.getActicles();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 查看文章
            clickArticle(article){
                this.$router.push({path:"/articleDetail",query:{articleId:article.id}});
            },
            // 文章分页改变
            pageArticleChange(page){
                this.arPage = page;
                // 重新获取文章
                this.getActicles();
            }
        },
        created() {
            // 判断是否需要查询数据
            if(this.$route.query != null && this.$route.query.activeId != null){
                this.activeId = this.$route.query.activeId;
            }
            // 查询个人信息
            this.getUserInfo();
            // 获取分类列表
            this.getSortList();
            // 获取文章
            this.getActicles();
            // 查询问题
            this.getProblems();
            // 查询答案
            this.getPersonOfAnswers();

        }
    }
</script>

<style scoped>
    .content{
        margin: 10px auto;
        width: 60%;
    }
    .tabContent{
        height: 540px;
    }
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
