<template>
    <div class="course-list-wrapper">
        <!-- 课程筛选 -->
        <div class="course-filter">
      <span
              v-for="(item,index) in filterList"
              :key="index"
              :class="{active: index == filterIndex}"
              @click="handleFilterClick(item, index)"
      >{{ item.title }}</span>
        </div>

        <!-- 课程列表 -->
        <ul v-if="list.length" class="course-list">
            <li v-for="(item,index) in list" :key="index" class="list-item" @click="handleCourseClick(item)">
                <div class="img-box">
                    <img :src="item.img" alt="">
                    <div class="tags">
                        <span v-for="(label, index) in item.labels" :key="index" class="tag-item">{{ label }}</span>
                    </div>
                </div>
                <div class="course-content">
                    <h2 class="title ellipsis"> <!-- 标题 -->
                        {{ item.title }}
                    </h2>
                    <p>
                        <!-- 学习人数-->
                        <span class="number"><i class="iconfont el-icon-user-solid"></i>20</span>
                        <!-- 评分 -->
                        <el-rate v-model="item.value" style="display: inline-block; margin-left: 5px" disabled></el-rate>
                    </p>
                    <p class="desc"> <!-- 课程描述-->
                        {{ item.introduction }}
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

    </div>
</template>
<script>
    export default {
        props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data () {
            return {
                isHide: false,
                filterList: [],
                filterIndex: 0
            }
        },
        created () {
            this.filterList = [
                { title: '默认排序', code: '' },
                { title: '最新', code: '-time' },
                { title: '最热', code: '-persons' }
            ]
        },
        methods: {
            // 排序方式点击
            handleFilterClick (item, index) {
                this.filterIndex = index;
                // this.$emit('update:sort', item.code)
            },
            // 课程点击事件
            handleCourseClick (lesson) {
                this.$router.push({ path: `/courseDetail` })
            }
        }
    }
</script>

<style lang="stylus" scoped>
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
                width: 216px;
                cursor: pointer;
                &:hover
                    .course-content
                        .title
                            color: #f01414;
                .img-box
                    position: relative;
                    img-box(216px, 120px);
                    & > img
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
                        margin-bottom: 22px;
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
                        &.desc
                            height: 50px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            text-overflow: ellipsis;
                            overflow: hidden;

    .empty-container
        padding: 30px 0;
        min-height: 300px;
        text-align: center;
        .empty-msg
            line-height: 24px;
            font-size: 16px;
            color: #f01414;
</style>
