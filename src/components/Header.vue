<template>
    <div class="header">
        <!-- logo -->
        <div class="logo-box">
            <router-link to="/">
                <img src="https://www.imooc.com/static/img/index/logo.png" height="72" alt="Logo">
            </router-link>
        </div>
        <!-- 导航 -->
        <ul class="header-nav">
            <li v-for="(item,index) in list" :key="index" class="nav-item">
                <router-link :to="item.path" class="nav-link">
                    {{ item.title }}
                </router-link>
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
        <ul class="login-area" >
            <li class="item sign">
                <span class="sign-btn" @click="handleLoginClick">登录</span> /
                <span class="sign-btn" @click="handleRegisterClick">注册</span>
            </li>
        </ul>
        <div class="user" v-if="false">
            <el-dropdown class="userInfo" @command="handleCommand">
                    <span class="el-dropdown-link userName">
                      {{user.username}}
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

    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                list:[{
                    path: '/courses',
                    title: '课程中心'
                },{
                    path: '/question',
                    title: '问答中心'
                },{
                    path: '/article',
                    title: '文章中心'
                }],
                user:{
                    username:'zyh',
                    userAvatar:'https://img3.sycdn.imooc.com/5a5d1f3a0001cab806380638-140-140.jpg'
                }

            }
        },
        methods:{
            // 登录
            handleLoginClick(){

            },
            // 注册
            handleRegisterClick(){

            },
            // 头像选中
            handleCommand(){

            }
        }
    }
</script>
<style lang="stylus" scoped>

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
