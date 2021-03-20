<template>
    <div class="article">
        <!-- 头部 -->
        <div class="article-header">
            <img class="article-icon" src="https://www.imooc.com/static/img/article/article-logo.png" alt="">
            <div class="search-container">
                <div class="search-box">
                    <input type="text" placeholder="搜索感兴趣的知识和文章">
                    <i class="iconfont el-icon-search"></i>
                </div>
                <span class="write-btn">写文章</span>
            </div>
        </div>

        <!-- 内容部分 -->
        <div class="article-content">
            <!-- 导航 -->
            <div class="nav">
                <ul>
                    <li
                            v-for="(item,index) in navList"
                            :key="index"
                            class="nav-item"
                            :class="{active: currentNavIndex==index}"
                            @click="handleNavClick(item, index)"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>

            <!-- -->
            <div class="list">
                <div v-if="articleList && articleList.length">
                    <!-- 文章列表 -->
                    <ul class="list-content">
                        <li v-for="(item,index) in articleList" :key="index" class="list-item">
                            <div class="img-box">
                                <img :src="item.img" alt="">
                            </div>
                            <div class="content">
                                <p class="title">
                                    {{ item.title }}
                                </p>
                                <p class="information">
                                    <span class="iconfont el-icon-view"></span>
                                    <span class="number">{{ item.views }}</span>
                                    <span class="author">{{ item.author }}</span>
                                    <span class="tag">{{ item.tag }}</span>
                                    <span class="time">{{ item.time }}</span>
                                </p>
                            </div>
                        </li>
                    </ul>

                    <!-- 分页 -->

                </div>
                <div class="empty-container" v-else>
                    <img class="empty-img" src="@/assets/images/empty.jpg" alt="">
                    <p class="empty-msg">
                        {{ message }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                currentNavIndex: 1,
                navList:['推荐','推荐','推荐','推荐','推荐','推荐','推荐','推荐','推荐','推荐','推荐'],
                articleList: [{
                    img:'https://img1.mukewang.com/5bf3a0670001160b02720272-200-200.jpg',
                    title:'怎样学习 SpringBoot',
                    views: '30',
                    author:'张勤一',
                    tag:'Java',
                    time:'07.31'
                },{
                    img:'https://img1.mukewang.com/5bf3a0670001160b02720272-200-200.jpg',
                    title:'怎样学习 SpringBoot',
                    views: '30',
                    author:'张勤一',
                    tag:'Java',
                    time:'07.31'
                },{
                    img:'https://img1.mukewang.com/5bf3a0670001160b02720272-200-200.jpg',
                    title:'怎样学习 SpringBoot',
                    views: '30',
                    author:'张勤一',
                    tag:'Java',
                    time:'07.31'
                }]
            }
        },
        methods: {
            handleNavClick(item, index){
                this.currentNavIndex = index;
                // 根据item获取最新的数据
            }
        }
    }
</script>

<style lang="stylus" scoped>
    // 空数据
    .empty-container
        padding: 30px 0;
        min-height: 300px;
        text-align: center;
        .empty-msg
            line-height: 24px;
            font-size: 16px;
            color: #f01414;
    // 文章
    .article
        margin: 0 auto;
        width: 1152px;
        .article-header
            margin-top: 10px;
            height: 60px;
            .article-icon
                display: inline-block;
                vertical-align: middle;
                height: 100%;
            .search-container
                float: right;
                padding: 12px 0;
                height: 60px;
                box-sizing: border-box;
                .search-box
                    display: inline-block;
                    position: relative;
                    width: 480px;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 8px;
                    background-color: #eff1f0;
                    input
                        padding: 0 60px 0 20px;
                        width: 100%;
                        height: 36px;
                        box-sizing: border-box;
                        outline: none;
                        background: none;
                        line-height: 0;
                        font-size: 14px;
                        color: #9199a1;
                    .iconfont
                        position: absolute;
                        top: 10px;
                        right: 20px;
                        font-size: 20px;
                        font-weight: 700;
                        color: #9199a1;
                        cursor: pointer;
                .write-btn
                    display: inline-block;
                    margin-left: 10px;
                    padding: 8px 24px;
                    border-radius: 18px;
                    background-color: #37f;
                    line-height: 18px;
                    font-size: 14px;
                    color: #fff;
                    cursor: pointer;
        .article-content
            display: flex;
            align-items: flex-start;
            padding: 20px 0 50px;
            .nav
                flex: 0 0 104px;
                width: 104px;
                padding: 8px 0;
                border-radius: 6px;
                background-color: #fff;
                box-shadow: 0 4px 8px 0 rgba(28,31,33,.1);
                .nav-item
                    margin: 0 auto;
                    margin-bottom: 8px;
                    padding: 8px 0;
                    width: 85px;
                    line-height: 20px;
                    text-align: center;
                    font-size: 14px;
                    word-break: break-all;
                    cursor: pointer;
                    &:hover
                        color: #37f;
                    &.active
                        background-color: rgba(51,119,255,.1);
                        border-radius: 4px;
                        color: #37f;
                        font-weight: 700;
                    &:last-child
                        margin-bottom: 0;
            .list
                flex: 1;
                margin: 0 20px;
            .recommend
                flex: 0 0 280px;
                width: 280px;
                & > div
                    margin-bottom: 24px;
    // 文章列表
    .list-content
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(7,17,27,0.1);
        .list-item
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            &:last-child
                margin-bottom: 0;
                .content
                    border-bottom: none;
            .img-box
                flex: 0 0 66px;
                margin-right: 16px;
                width: 66px;
                height: 66px;
                & > img
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    background-color: #eee;
        .content
            flex: 1;
            height: 66px;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .title
                margin-bottom: 4px;
                line-height: 30px;
                color: #1c1f21;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                &:hover
                    color: #37f;
            .information
                & > span
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 8px;
                    font-size: 12px;
                    color: #9199a1;
                    &.author
                        margin-left: 8px;
                        padding-right: 10px;
                    &.time
                        float: right;
</style>
