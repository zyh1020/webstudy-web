<template>
    <div class="course-nav">
        <dl>
            <dt>方向：</dt>
            <dd
                    v-for="(item,index) in directionList"
                    :key="index"
                    :class="{active: index===directionIndex}"
                    @click="handleNavClick('direction', index)"
            >
                {{ item.title }}
            </dd>
        </dl>

        <dl>
            <dt>分类：</dt>
            <dd
                    v-for="(item,index) in currentLabels"
                    :key="index"
                    :class="{active: index===categoryIndex}"
                    @click="handleNavClick('category', index)"
            >
                {{ item.title }}
            </dd>
        </dl>

        <dl>
            <dt>难度：</dt>
            <dd
                    v-for="(diff,index) in diffList"
                    :key="index"
                    :class="{active: index===diffIndex}"
                    @click="handleNavClick('diff', index)"
            >
                {{ diff.title }}
            </dd>
        </dl>
    </div>
</template>
<script>
    export default {
        /*props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            }
        },*/
        data () {
            return {
                directionIndex: 0, // 方向
                categoryIndex: 0, // 分类
                diffIndex: 0, // 难度
                diffList: [], // 难度数据列表
                currentIndex: 0
            }
        },
        created () {
            this.diffList = [
                { title: '全部', code: '' },
                { title: '入门', code: 0 },
                { title: '初级', code: 1 },
                { title: '中级', code: 2 },
                { title: '高级', code: 3 }
            ]
        },
        methods: {
            // 导航点击事件
            handleNavClick (type, index) {
                switch (type) {
                    case 'direction':
                        this.directionIndex = index;
                        this.categoryIndex = 0;
                        break;
                    case 'category':
                        this.categoryIndex = index;
                        break;
                    case 'diff':
                        this.diffIndex = index;
                        break
                }
                // 向父组件传递事件消息
                // this.$emit('update:params', this.emitParams)
            }
        },
        computed: {

            // 方向的数据
            directionList () {
                // 返回一级导航数据
                return [
                    {
                        title: '前端',

                    },
                    {
                        title: '后端',

                    }

                ]

            },
            // 分类的数据
            currentLabels () {
                // 返回二级导航数据
               return [
                    {
                        title: 'java',

                    },
                    {
                        title: 'css',

                    }
                ]

            },
            // 向父组件传递 事件
            emitParams () {

            }
        }
    }
</script>
<style lang="stylus" scoped>
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
</style>
