<template>
    <div class="question">
        <!-- 头部 -->
        <div class="question-header">
            <div class="question-search">
                <img src="https://www.imooc.com/static/img/wenda/wenda-logo.png" alt="">
                <div class="search-box">
                    <input type="text" placeholder="请输入你的问题">
                    <i class="iconfont el-icon-search"></i>
                </div>
                <div class="search-btn">
                    提问
                </div>
            </div>
            <div v-if="userInfo.id" class="question-nav">
                <dl>
                    <dt>我的关注：</dt>
                    <dd
                            v-for="(item, index) in followList"
                            :key="index"
                            :class="{
                                    active: currentIndex == index
                             }"
                            @click="handleLikeClick(item, index)"
                    >
                        {{ item.title }}
                    </dd>
                    <dd @click="handleLabelManageClick">标签管理</dd>
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
                                <span v-if="item.isResolve" class="iconfont el-icon-check"></span>
                                <!-- 回答的个数-->
                                <span>{{ item.answers }}</span>
                            </div>
                            <div class="content-box">
                                <!-- 问题的标题 -->
                                <h3 class="title">
                                    {{ item.title }}
                                </h3>
                                <p class="tag">
                                    <img :src="item.icon" alt="">
                                    <span
                                            v-for="(tag, index) in item.tags"
                                            :key="index"
                                            class="name"
                                    >{{ tag }}</span>
                                    <span class="view-box">

                    <!-- -->
                    <i class="iconfont el-icon-view"></i>
                    <span class="view-number">{{ item.views }}</span>
                  </span>
                                </p>
                            </div>
                        </li>
                    </ul>
                   <!-- <empty v-else message="暂无相关猿问数据"></empty>-->
                </div>
            </div>
           <!-- 分页 -->
        </div>

        <!-- 标签弹框设置 -->
        <el-dialog
            title="选择感兴趣的标签"
            :visible.sync="dialogVisible"
            width="600px">
            <div class="label-container">
                <dl v-for="(type, index) in labelList"
                        :key="index"
                        class="label-group">
                    <dt class="label-group-title">{{ type.title }}</dt>
                    <dd v-for="(label, labelIndex) in type.list"
                            :key="labelIndex"
                            class="label-item"
                            :class="{
                                'is-active': label.isSelected
                             }"
                            @click="handleLabelClick(index, label, labelIndex)">
                        {{ label.title }}
                    </dd>
                </dl>
            </div>
            <template slot="footer">
                <el-button type="success" :disabled="isLoading" @click="handleFollowClick">完成</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                userInfo:{
                  id: 'zyh'
                },
                dialogVisible: false, // 选择标签弹出框
                isLoading: false, // 是否完成
                currentIndex: 1, // 当前
                labelList: [{
                    title: '前端',
                    list:[{
                        isSelected: true,
                        title: 'css'
                    }]
                },{
                    title: '后端',
                    list:[{
                        isSelected: false,
                        title: 'java'
                    }]
                }], // 标签内容
                followList:[{
                    title: '全部'
                },{
                    title: 'css'
                }],// 选中的标签内容

                questionList:[{
                    isResolve:true,
                    answers: 3,
                    title:'Chrome59到底支不支持forEach函数？',
                    icon:'https://img.mukewang.com/59e96f340001faac02400240.jpg',
                    tags:['js','html'],
                    views: 30
                },{
                    isResolve:true,
                    answers: 3,
                    title:'Chrome59到底支不支持forEach函数？',
                    icon:'https://img.mukewang.com/59e96f340001faac02400240.jpg',
                    tags:['js','html'],
                    views: 30
                },{
                    isResolve:true,
                    answers: 3,
                    title:'Chrome59到底支不支持forEach函数？',
                    icon:'https://img.mukewang.com/59e96f340001faac02400240.jpg',
                    tags:['js','html'],
                    views: 30
                },{
                    isResolve:true,
                    answers: 3,
                    title:'Chrome59到底支不支持forEach函数？',
                    icon:'https://img.mukewang.com/59e96f340001faac02400240.jpg',
                    tags:['js','html'],
                    views: 30
                },{
                    isResolve:true,
                    answers: 3,
                    title:'Chrome59到底支不支持forEach函数？',
                    icon:'https://img.mukewang.com/59e96f340001faac02400240.jpg',
                    tags:['js','html'],
                    views: 30
                }] // 问题列表
            }

        },
        methods:{
            // 点击标签管理
            handleLabelManageClick(){
                this.dialogVisible = true;
                // 获取所有标签
            },
            // 选择标签后点击完成
            handleFollowClick(){
                this.dialogVisible = false;
                this.isLoading = true;
            },
            // 选中标签
            handleLabelClick(index, label, labelIndex){

            },
            // 更改标签类型
            handleLikeClick(item, index){

            }
        }
    }
</script>

<style lang="stylus" scoped>
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
                    &:last-child
                        float: right;
                        margin-right: 0;
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
