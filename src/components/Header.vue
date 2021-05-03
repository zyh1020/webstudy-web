<template>
    <div class="header">
        <!-- logo -->
        <div class="logo-box">
            <div class="logo" @click="toHome">
                web学习交流
            </div>
        </div>
        <!-- 导航 -->
        <ul class="header-nav">
            <li v-for="(nav,index) in list" :key="index" class="nav-item" @click="toPath(nav)">
                <div class="nav-link">
                    <span :class="nav.path == currentPath ? 'redFondColor':''">{{ nav.title }}</span>
                </div>
            </li>
        </ul>
        <!-- 搜索框 -->
        <div class="headerSearch">
            <el-autocomplete
                    placeholder="前端入门 Java基础">
                <i class="el-icon-search el-input__icon" slot="suffix"></i>
            </el-autocomplete>
        </div>

        <!-- 用户/ 注册登录-->
        <div class="user" v-if="user">
            <el-dropdown class="userInfo" @command="handleCommand">
                    <span class="el-dropdown-link userName">
                      {{user.name}}
                        <i><img :src="user.userAvatar"></i>
                    </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <ul class="login-area" v-else>
            <li class="item sign">
                <span class="sign-btn" @click="handleLoginClick">登录</span> /
                <span class="sign-btn" @click="handleRegisterClick">注册</span>
            </li>
        </ul>


        <!-- 弹出框 -->
        <el-dialog
                :visible.sync="loginDialogVisible"
                width="30%"
                append-to-body>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="登录" name="login">
                        <el-form ref="loginVo" :model="loginVo" label-width="80px">
                            <el-form-item label="手机号:">
                                <el-input v-model="loginVo.username" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="密码:">
                                <el-input v-model="loginVo.password" placeholder="请输入密码" show-password></el-input>
                            </el-form-item>
                            <el-form-item label="验证码:">
                                <el-input v-model="loginVo.code" placeholder="验证码" style="width: 50%"></el-input>
                                <el-button @click="sendCode" style="margin-left:30px;width: 30%" :disabled="sendCodeDisabled">{{msg}}</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="register">
                        <el-form ref="form" :model="registerVo" label-width="80px">
                            <el-form-item label="手机号">
                                <el-input v-model="registerVo.name"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称">
                                <el-input v-model="registerVo.name"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="registerVo.name"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input v-model="registerVo.name" style="width: 50%"></el-input>
                                <el-input type="button" @click="sendCode" v-model="msg"  style="margin-left:30px;width: 30%" :disabled="sendCodeDisabled"/>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="userLoginOrRegister">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {userLogin,userInfo} from '@/api/user/user'
    export default {
        name: "Header",
        data(){
            return {
                loginDialogVisible:false,
                activeName:'login',
                loginVo:{ // 登录对象
                    username:'17633837738',
                    password:'123456'
                },
                registerVo:{ // 注册对象
                },
                msg:'发送验证码',
                sendCodeDisabled: false,// 禁止发送验证码？
                countdown: 60,// 倒计时秒数
                currentPath: "/",
                list:[{
                    path: '/course',
                    title: '课程中心'
                },{
                    path: '/question',
                    title: '问答中心'
                },{
                    path: '/article',
                    title: '文章中心'
                }],
                user:null
            }
        },
        methods:{
            // 跳转到首页
            toHome(){
                this.currentPath = '/';
                this.$router.replace("/");
            },
            // 导航跳转
            toPath(nav){
                this.currentPath = nav.path;
                this.$router.replace(nav.path);
            },
            // 登录
            handleLoginClick(){
                this.activeName = 'login';
                this.loginDialogVisible = true;
            },
            // 注册
            handleRegisterClick(){
                this.activeName = 'register';
                this.loginDialogVisible = true;
            },
            // 发送验证码
            sendCode(){
                // 验证码60秒倒计时
                if (!this.timer) {
                    this.timer = setInterval(() => {
                        if (this.countdown > 0 && this.countdown <= 60) {
                            this.countdown--;
                            if (this.countdown !== 0) {
                                this.sendCodeDisabled = true;
                                this.msg = "重新发送(" + this.countdown + ")";
                            } else {
                                clearInterval(this.timer);
                                this.msg = "获取验证码";
                                this.countdown = 60;
                                this.timer = null;
                                this.sendCodeDisabled = false;
                            }
                        }
                    }, 1000)
                }
            },
            userLoginOrRegister(){ // 用户登录用户注册
                if(this.activeName === 'login'){ // 登录
                    this.userLogin();
                }else if(this.activeName === 'register'){ // 注册
                    this.userRegister();
                }
                this.loginDialogVisible = false;
            },
            userLogin(){ // 登录
                userLogin(this.loginVo).then(response => {
                    if (response){
                        let token = response.data;
                        if(token){
                            window.sessionStorage.setItem("token",token);
                            this.getUserInfo();// 获取用户信息
                        }
                    }
                })
            },
            userRegister(){ // 注册
            },
            getUserInfo(){
                userInfo().then(response => {
                    this.user = response.data;
                })
            },
            // 头像选中
            handleCommand(value){
                if(value == "logout"){ // 退出登录
                    this.user = null; //
                    window.sessionStorage.clear(); // 清空信息
                }else if(value == "personal"){
                    this.$router.replace({path:"/person",query:{
                            activeId:"personal"
                    }
                })
                }
            }
        },
        created() {
            // 当前路由
            let path = window.location.href;
            this.currentPath = path.substring(path.lastIndexOf("/"));
            // ①，获取用户
            let token = window.sessionStorage.getItem("token");
            console.log(token);
            if(token){ // 用户登录了
                this.getUserInfo();
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .redFondColor{
        color: red;
    }
    .logo{
        width: 180px;
        height: 72px;
        font-size: 20px;
        line-height: 72px;
        text-align center;
        color: black;
    }
    .el-autocomplete{
        width:350px;
    }

    .header{
        z-index: 200;
        position: relative;
        padding-right: 10px;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(7,17,27,0.1);
    }

    .logo-box{
        float: left;
        width: 140px;
        margin: 0 20px;
        height: 100%;
    }

    // 搜索框
    .headerSearch{
        float: left;
        margin-top: 20px;
        margin-left: 450px;
    }
    // 登录区域
    .login-area{
        float: right;
        position: relative;
        margin-right 50px;
    }
    .item{
        float: left;
        line-height: 72px;
        font-size: 14px;
        color: #71777d;
    }
    .sign{
        margin-left: 10px;
    }

    .sign-btn{
        display: inline-block;
        padding: 0 18px;
        cursor: pointer;
        font-size: 16px;
        color: #4d555d;
    }

    .sign-btn:hover{
        color: #f01414;
    }


    // 导航
    .header-nav{
        float: left;
        overflow: hidden;
        margin-left: 60px;
    }
    .nav-item{
        float: left;
        margin-left: 20px;
    }
    .nav-item :hover{
        color: red;
        cursor:pointer
    }
    .nav-link{
        display: block;
        position: relative;
        padding: 0 20px;
        height: 72px;
        line-height: 72px
        color: #4d555d;
    }

    // 用户
    .user{
        float: right;
        position: relative;
        margin-right 50px;
    }
    .userName{
        font-size: 18px;
        font-family: '宋体';
    }
    .userName img{
        height: 60px;
        width:  60px;
        border-radius: 50%;
        margin-left: 8px;
        margin-top: 8px;
    }
    .userInfo{
        cursor:pointer;
    }

</style>
