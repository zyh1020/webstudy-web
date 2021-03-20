import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import("@/views/Home");
const Courses = () => import("@/views/course/index");
const CourseDetail = () => import("@/views/courseDetail/index");
const Article = () => import("@/views/article/index");
const Question = () => import("@/views/question/index");

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        name:'主页',
        component: Home
    },
    {
        path:'/courses',
        name:'课程中心',
        component: Courses
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
    }
];
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router