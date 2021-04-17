<template>
    <div class="addOrUpdateArticle">
        <el-card>
            <div>
                <el-form ref="form" :model="article" :inline="true" label-width="80px">
                    <el-row>
                        <el-form-item label="文章标题">
                            <el-input type="text" placeholder="请输入文章标题例如：vue通过filter对时间格式化" v-model="article.articleTitle" style="width: 600px"></el-input>
                        </el-form-item>
                    </el-row>
                   <el-row>
                       <el-form-item label="文章分类">
                           <el-select v-model="article.sortId" placeholder="请选择文章分类">
                               <el-option :label="sort.name" :value="sort.id" v-for="(sort,index) in sortList" :key="index"></el-option>
                           </el-select>
                       </el-form-item>
                       <el-form-item label="是否发布">
                           <el-switch
                                   v-model="article.isPulish"
                                   active-color="#13ce66"
                                   inactive-color="#ff4949">
                           </el-switch>
                       </el-form-item>
                       <el-form-item>
                           <el-button type="success"  size="small" @click="addOrArticle">保存</el-button>
                       </el-form-item>
                   </el-row>

                </el-form>

            </div>
            <tinymce-editor
                    id="editor"
                    v-model="article.articleContent"
                    :height="600"/>
        </el-card>
    </div>
</template>

<script>
    import TinymceEditor from '@/components/tinymce';
    import {getAllCategoryList} from '@/api/sort/category'
    import {addAnswer} from '@/api/article/article'
    export default {
        name: "AddOrUpdateArticle",
        components: { //注册TinymceEditor组件
            TinymceEditor
        },
        data(){
            return{
                allSorts:[], // 分类列表
                sortList:[], // 筛选后的分类列表
                article: {
                    sortId:'',
                    articleTitle:'',
                    articleContent:'',
                    isPulish: false
                }

            }
        },
        methods:{
            addArticle(){ // 添加文章
                addAnswer(this.article).then(response => {
                    if(response){
                        // 跳转到文章列表页。
                        this.$router.replace("/article")
                    }
                })
            },
            addOrArticle(){ // 添加或修改文章
                if(this.article.id){ // 修改

                }else{ // 添加
                    this.addArticle();
                }

            },
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
                for(let sort of this.allSorts){
                    if(sort.level == 1){
                        this.sortList.push(sort);
                    }
                }
            }
        },
        created() {
            // 获取分类列表
            this.getSortList();
        }
    }
</script>

<style scoped>
    .addOrUpdateArticle{
        width: 60%;
        margin: 20px auto;
    }
</style>
