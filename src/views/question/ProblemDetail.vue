<template>
    <div class="problem">
        <div class="header">
            <el-card>
                <div class="problemWrap">
                    <div class="problemTitle">{{problem.problemTitle}}</div>
                    <div class="problemDesc">
                        <div>
                            <el-tag class="problemTag" size="mini">
                                {{problem.twoLevelSortName}}
                            </el-tag>
                        </div>
                        <div class="nameAndTime">
                            <div v-if="problem.sysUser">{{problem.sysUser.name}}</div>
                            <div>{{problem.createTime | formatDate}}</div>
                        </div>
                    </div>
                    <div>
                        {{problem.problemContent}}
                    </div>
                    <div class="btn">
                        <el-button size="small" type="primary" @click="showAddAnswer">做回答</el-button>
                    </div>
                </div>
            </el-card>
        </div>

        <div class="answer">
            <el-card>
                <div class="answerWrap">
                    <div class="answerCount">
                        回答数量：{{answers.length}}
                    </div>
                    <div class="answerList">
                        <!--  单个回答-->
                        <div class="answerItem" v-for="(item, index) in answers" :key="index">
                            <div class="userInfo">
                                <div>
                                    <img class="avatar" :src="item.sysUser.userAvatar" alt="头像">
                                </div>
                                <div class="nameAndTime">
                                    <div>{{item.sysUser.name}}</div>
                                    <div>{{item.createTime | formatDate}}</div>
                                </div>
                            </div>
                            <div class="answerContent">
                                {{item.answerContent}}
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>

        <el-dialog
                title="回答"
                :visible.sync="addAnswerVisible"
                width="30%">
             <el-input type="textarea" v-model="answerContent" :rows="8">
             </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addAnswerVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAnswer">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getProblemDetail} from '@/api/question/problem'
    import {getfindAnswers,addAnswer} from '@/api/question/answer'

    export default {
        name: "problemDetail",
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
        data(){
            return {
                problemId:'', // 目前问题id
                problem:{}, // 问题
                addAnswerVisible: false, // 回答弹框
                answerContent:'', // 回答内容
                answer:{},
                answers:[]
            }
        },
        methods:{
            // 查询问题详情
            findProblemDetail(){
                getProblemDetail(this.problemId).then(response =>{
                    if(response){
                        this.problem = response.data;
                    }
                })
            },
            // 查询答案列表
            findAnswerList(){
                getfindAnswers(this.problemId).then(response =>{
                    if(response){
                        this.answers = response.data;
                    }
                })
            },
            // 问题弹框
            showAddAnswer(){
                // ①，获取用户
                let token = window.sessionStorage.getItem("token");
                if(token){
                    this.answerContent = '';
                    this.addAnswerVisible = true;
                }else {
                    this.$message.error('尚未登录，请先登录！');
                }
            },
            // 添加答案
            addAnswer(){
                this.answer.problemId = this.problemId;
                this.answer.answerContent = this.answerContent;
                addAnswer(this.answer).then(response =>{
                    if(response){
                        // 查询问题详情
                        this.findProblemDetail();
                        // 答案列表
                        this.findAnswerList();
                        this.addAnswerVisible = false;
                    }
                });

            }
        },
        created() {
            // 判断是否需要查询数据
            if(this.$route.query != null && this.$route.query.problemId != null){
                this.problemId = this.$route.query.problemId;
                // 查询问题详情
                this.findProblemDetail();
                // 答案列表
                this.findAnswerList();
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .problem{
        height: 100%;
        width: 60%;
        margin: 20px auto;
        .header{
             width: 100%;
            .problemWrap{
                padding: 15px;
                .problemTitle{
                    margin-bottom: 20px;
                    font-weight:600;
                    font-size: 25px;
                }
            .problemDesc{
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                .problemTag{
                    margin-right: 10px;
                }
                .nameAndTime{
                    display: flex;
                    margin-right: 30px;
                    div{
                        margin-right: 20px;
                        font-size: 14px;
                    }
                }
            }
            .btn{
                width: 10%;
                margin: 20px auto;
            }
            }
         }
        .answer{
            margin-top: 50px;
            .answerWrap{
                padding: 15px;
                .answerCount{
                    padding: 0 0 20px;
                    border-bottom: 1px solid #cccccc;
                }
                .answerList{
                    .answerItem{
                        border-bottom: 1px solid #cccccc;
                        .userInfo{
                            margin: 5px 0;
                            display: flex;
                            .avatar{
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                            }
                            .nameAndTime{
                                display: flex;
                                div{
                                    margin-left: 20px;
                                    height: 40px;
                                    line-height: 40px;
                                }
                            }
                        }
                        .answerContent{
                            margin: 25px 0 25px 60px;
                        }
                    }
                }
            }
        }
    }
</style>
