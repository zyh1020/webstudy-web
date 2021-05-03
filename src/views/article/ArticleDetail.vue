<template>
    <div class="articleDetail">

        <el-card class="content">
            <div v-if="articel != null">
                <!-- 文章标题 -->
                <div class="aricleTitel">
                    {{articel.articleTitle}}
                </div>
                <!-- 作者  -->
                <div class="author">
                    <el-row>
                        <!-- 头像 -->
                        <el-col :span="3">
                            <img :src="articel.sysUser.userAvatar" class="authorHeard">
                        </el-col>
                        <el-col :span="21">
                            <el-tag>作者：{{articel.sysUser.name}}</el-tag> &nbsp
                            <el-tag type="info">分类：{{articel.sortName}}</el-tag> <br/><br/>

                            <el-tag type="success">发表时间：{{articel.createTime | formatDate}}</el-tag>
                            &nbsp
                            <el-tag type="warning">更改时间：{{articel.updateTime | formatDate}}</el-tag>
                        </el-col>
                    </el-row>
                </div>
                <div class="aricleContent">
                    <el-divider content-position="left">已有20人浏览了该文章</el-divider>
                    <div v-html="articel.articleContent">

                    </div>
                </div>
            </div>
            <div v-else>
                文章丢失了
            </div>
        </el-card>
    </div>
</template>

<script>
    import {getArticleById} from '@/api/article/article'
    export default {
        name: "ArticleDetail",
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
            return{
                articleId:'',
                articel:null
            }
        },
        methods:{
            findArticleByid(){
                getArticleById(this.articleId).then(response =>{
                    if(response){
                        this.articel = response.data;
                    }
                });
            }

        },
        created() {
            // 判断是否需要查询数据
            if(this.$route.query != null && this.$route.query.articleId != null){
                this.articleId = this.$route.query.articleId;
                // 查询文章详情
                this.findArticleByid();
            }
        }
    }
</script>

<style scoped>

    .content{
        width: 50%;
        border-radius: 10px;
        margin: 10px auto;
        padding: 30px 30px 20px 30px;
    }
    .aricleTitel{
        font-size:24px;
        font-weight: 600;
    }
    .author{
        margin-top: 30px;
    }
    .authorHeard{
        width: 80px;
        height: 80px;
        border-radius: 20%;
    }
    .aricleContent{
        margin-top: 38px;
    }
</style>
