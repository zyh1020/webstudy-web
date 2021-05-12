<template>
  <div class="course-detail">
    <!-- 头部 -->
    <div class="course-detail-header">
      <div class="header">
        <div class="header-content m-center">
          <!-- 课程 标题-->
          <p class="breadcrumb-box">
            <span>课程 \ {{ courseVo.title }}</span>
          </p>
          <!-- 按钮 -->
          <p class="share-box">
            <span class="iconfont el-icon-star-off" style="color: yellow" v-show="isFollow" @click="followOrCancelCourse"></span>
            <span class="iconfont el-icon-star-off"  v-show="!isFollow" @click="followOrCancelCourse"></span>
          </p>
          <h2 class="title">
            {{ courseVo.title }}
          </h2>
          <div class="information">
            <!-- 上传人 -->
            <div v-if="courseVo.sysUser" class="teacher">
              <!-- 头像-->
              <img :src="courseVo.sysUser.userAvatar" class="avatar" alt="">
              <div class="teacher-introduce">
                <p class="name">
                  {{ courseVo.sysUser.name }}
                </p>
              </div>
              <dl>
                <dd>难度：<el-rate style="display: inline-block" v-model="courseVo.difficulty" disabled></el-rate>
                </dd>
                <dd>时长：{{ courseVo.courseTime}}小时</dd>
                <dd>学习人数：{{courseVo.studyPersonNum }}</dd>
                <dd>浏览量：{{courseVo.lookPersonNum}}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="course-detail-content">
      <div class="detail-nav"></div>
      <!-- 内容部分 -->
      <div class="detail-information">
        <!-- 左边-->
        <div class="information-left">
          <div class="chapter">
            <div v-html="courseVo.description" class="chapter-introduce">
            </div>
            <div v-for="(chapter,chapterIndex) in chapters" :key="chapterIndex" class="chapter-item">
              <h2 class="chapter-title">
                {{ chapter.title }}
              </h2>
              <ul>
                <li v-for="(vedio, vedioIndex) in chapter.vedios" :key="vedioIndex" class="term-item">
                  <p @click="playVedio(vedio)">
                    <span class="iconfont el-icon-video-play"></span>
                    <span>{{ vedio.title }}</span>
                    <span class="right">
                        <i class="el-icon-video-play"></i>
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            <p v-if="isComplete" class="complete-info">
              <i class="el-icon-circle-check"></i>
              本课程已完结
            </p>
          </div>
        </div>
        <!-- 右边-->
        <div class="information-right">
          <div class="course-detail-tips">
            <div class="tips-btn">
              开始学习
            </div>
            <!-- 课程须知 -->
            <div class="tips-content">
              <dl>
                <dt>课程须知</dt>
                <dd>1、对Javascript基础知识已经掌握。</dd>
                <dd>2、对Es6和webpack有简单了解。</dd>
              </dl>
              <dl>
                <dt>老师告诉你能学到什么？</dt>
                <dd>1、使用Vue2.0版本实现响应式编程 </dd>
                <dd>2、理解Vue编程理念与直接操作Dom的差异</dd>
                <dd>3、Vue常用的基础语法 </dd>
                <dd>4、使用Vue编写TodoList功能 </dd>
                <dd>5、什么是Vue的组件和实例 </dd>
                <dd>6、Vue-cli脚手架工具的使用</dd>
                <dd>7、但文件组件，全局样式与局部样式</dd>
              </dl>
            </div>
          </div>
          <detail-tags></detail-tags>
        </div>
      </div>
    </div>

    <!-- 弹框部分 -->
    <el-dialog
            :title="currentVediotitle"
            :visible.sync="playVedioVisible"
            @close="playVedioClose"
            width="60%">
     <div>
       <div class="prism-player" id="J_prismPlayer" v-loading="loading" style="height: 500px;width: 100%;">
       </div>
     </div>
    </el-dialog>

  </div>


</template>
<script>
import DetailTags from './tags.vue'

import {findOneCourseInfo,isFollowCourses,cancelFollowCourses,followCourse} from '@/api/course/courseInfo'
import {findOneCourseAllCapter} from '@/api/course/courseChapter'
import {getPlayauth} from '@/api/course/courseVedio'

export default {
  name: 'CourseDetail',
  data () {
    return {
      currentCourseId:'', //当前课程Id
      currentVedioId:'', // 当前视频id
      currentPlayauth:'', // 当前视频播放凭证
      currentVediotitle:'', //当前视频标题
      chapters: [], // 课程的章节列表
      courseVo: {}, // 课程信息
      isFollow: false,// 关注的课程
      isComplete: true,
      aliPlayer:null,
      playVedioVisible: false,
      loading: true
    }
  },
  methods: {
    // 获取课程信息
    findOneCourse(){
      findOneCourseInfo(this.currentCourseId).then(response =>{
        if(response){
          this.courseVo = response.data;
        }
      });
    },
    // 获取章节信息
    findCourseAllCapter(){
      findOneCourseAllCapter(this.currentCourseId).then(response =>{
        this.chapters = response.data;
      });
    },
    // 获取视频播放凭证
    async playVedio(vedio){
      this.playVedioVisible = true;
      this.loading = true;
      this.currentVedioId = vedio.vedioId;
      this.currentVediotitle = vedio.title;
      await getPlayauth(this.currentVedioId).then(response =>{
        if(response){
          this.currentPlayauth = response.data;
        }
      });
      if(!this.aliPlayer){
        // 创建视频播放插件
        this.aliPlayer = new Aliplayer({
          id: 'J_prismPlayer',
          width: '100%',
          autoplay: false,
          // cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png', // 封面
          // 根据视频凭证播放
          encryptType:'1', // 当播放私有加密流时必须设置，非私密可以不加。
          vid: this.currentVedioId, // 视频id
          playauth:this.currentPlayauth
        });
      }
      this.aliPlayer.replayByVidAndPlayAuth(this.currentVedioId,this.currentPlayauth);
      this.loading = false;
    },
    playVedioClose(){
      this.aliPlayer.pause();
    },
    // 初始化界面
    async initData(){
      // 查询课程信息
      await this.findOneCourse();
      // 查询章节信息
      await this.findCourseAllCapter();
    },
    // 关注课程
    followOrCancelCourse(){
      // ①，获取用户
      let token = window.sessionStorage.getItem("token");
      if(token){
        if(this.isFollow){
          // 取消关注
          cancelFollowCourses(this.currentCourseId).then(response => {
            if(response){
              this.isFollow = false;
            }
          });
        }else {
          // 关注
          followCourse(this.currentCourseId).then(response => {
            if(response){
              this.isFollow = true;
            }
          });
        }
      }else {
        this.$message.error('尚未登录，请先登录！');
      }
    }
  },
  mounted () {
    // 判断是否需要查询数据
    if(this.$route.query != null && this.$route.query.courseId != null){
      this.currentCourseId = this.$route.query.courseId;
      this.initData();
      // ①，获取用户
      let token = window.sessionStorage.getItem("token");
      console.log("用户登录了");
      if(token){
        isFollowCourses(this.currentCourseId).then(response =>{
            if(response){
              if(response.data > 0){
                this.isFollow = true;
              }else {
                this.isFollow = false;
              }
            }
        })
      }
    }

  },
  components: {
    DetailTags
  }
}
</script>

<style lang="stylus" scoped>
  .course-detail-header
    height: 200px;
    background-image: linear-gradient(90deg, #19172D, #645DB7);
    .header
      height: 100%;
      .header-content
        position: relative;
        height: 100%;
        color: #fff;
        margin: 0 auto;
        width: 1152px;
        .breadcrumb-box
          padding: 16px 0 24px 0;
          line-height: 24px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        .share-box
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 12px;
          line-height: 24px;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          & > span
            margin: 0 12px;
            &:hover
              color: #fff;
          .iconfont
            font-size: 26px;
        .title
          margin-bottom: 8px;
          font-size: 32px;
          color: #fff;
          line-height: 48px;
        .information
          .teacher
            vertical-align: middle;
            display: flex;
            align-items: center;
            .avatar
              width: 48px;
              heighth: 48px;
              border-radius: 50%;
            .teacher-introduce
              margin-left: 8px;
              .name
                font-size: 14px;
                line-height: 24px;
                font-weight: 700;
              .job
                font-size: 12px;
            dl
              flex: 1;
              margin-left: 50px;
              dd
                display: inline-block;
                vertical-align: middle;
                margin: 0 10px;
                font-size: 12px;
                font-weight: 700;
                color: rgba(255,255,255,0.8);


  .chapter
    & > div
      margin-bottom: 16px;
      padding: 24px 32px 32px;
      background-color: #fff;
      box-shadow: 0 8px 16px rgba(7,17,27,0.1);
      border-radius: 12px;
      color: #1c1f21;
      font-size: 14px;
      &.chapter-introduce
        line-height: 28px;
      &.chapter-item
        .chapter-title
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
        .chapter-desc
          margin-top: 2px;
          margin-bottom: 16px;
          font-size: 12px;
          color: #545c63;
        .term-item
          width: 100%;
          padding-left: 12px;
          line-height: 48px;
          cursor: pointer;
          & > p
            display: flex;
            align-items: center;
            & > span
              &:nth-child(2)
                flex: 1;
          &:hover
            background-color: rgba(242,13,13,.05);
            border-radius: 4px;
            color: #f20d0d;
            .play
              color: #f20d0d;
            .right
              & > i
                color: #f20d0d!important;
          .play
            margin-right: 8px;
            font-size: 24px;
            color: #9199a1;
          .right
            margin-right:15px;
            font-size: 16px;
            color: #d9dde1;
            .complete, .doning
              color: #00b43c;
              font-size: 12px;
            .doning
              i
                margin-left: 10px;
                font-size: 12px;
    .complete-info
      margin-bottom: 16px;
      padding: 12px 0 12px 32px;
      font-size: 16px;
      color: #93999f;
      line-height: 24px;
      .iconfont
        display: inline-block;
        vertical-align: middle;
        margin-right: 12px;
        font-size: 24px;

  .course-detail-content
    .detail-nav
      position: relative;
      height: 68px;
      line-height: 68px;
      box-shadow: 0 4px 8px 0 rgba(7,17,27,0.15);
      .nav-item
        position: relative;
        display: inline-block;
        margin-right: 80px;
        font-size: 16px;
        color: #1c1f21;
        font-weight: 700;
        cursor: pointer;
        &.active
          color: #f20d0d;
          &::after {
            content: '';
            display: block;
            margin: -15px auto 0px;
            width: 16px;
            height: 3px;
            border-radius: 15px;
            background-color: #f20d0d;
          }
    .detail-information
      display: flex;
      align-items: top;
      margin: 0 auto;
      margin-top: 36px;
      margin-bottom: 36px;
      width: 1152px;
      .information-left
        flex: 1;
      .information-right
        margin-left: 32px;
        flex: 0 0 320px;
        width: 320px;
        & > div
          margin-bottom: 36px;

  // 右测tips
  .course-detail-tips
    padding: 24px 32px 32px;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
    border-radius: 12px;
    .learn-info
      padding-bottom: 12px;
      font-size: 12px;
      color: #545c63;
      & > p
        margin-bottom: 9px;
        line-height: 24px;
        &.latest
          margin-top: 24px;
          line-height: 1;
        .percent
          font-size: 14px;
          font-weight: 700;
        .duration
          float: right;
    .tips-btn
      padding: 11px 32px;
      border-radius: 24px;
      background-color: #f20d0d;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      &:hover
        background-color: #c20a0a;
    .tips-content
      dl
        margin-top: 24px;
        dt
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        dd
          color: #545c63;
          font-size: 12px;
          line-height: 24px;
</style>
