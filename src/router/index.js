import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import("@/views/Home");
const CourseList = () => import("@/views/course/CourseList");
const CourseDetail = () => import("@/views/course/CourseDetatil");
const Article = () => import("@/views/article/index");
const Question = () => import("@/views/question/index");
const QuestionDetail = () => import("@/views/question/ProblemDetail");
const AddOrUpdateArticle = () => import("@/views/article/AddOrUpdateArticle");

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        name:'主页',
        component: Home
    },
    {
        path:'/course',
        name:'课程中心',
        component: CourseList
    },
    {
        path:'/courseDetail',
        name:'课程详情页',
        component: CourseDetail
    },
    {
        path:'/article',
        name:'手记',
        component: Article
    },
    {
        path:'/question',
        name:'问题',
        component: Question
    },
    {
        path:'/questionDetail',
        name:'问题详情',
        component: QuestionDetail
    }
    ,
    {
        path:'/addOrUpdteArticle',
        name:'添加文章',
        component: AddOrUpdateArticle
    }
];
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router
