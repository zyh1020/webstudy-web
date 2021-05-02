<template>
  <ul class="course-list">
    <li
      v-for="(item,index) in list"
      :key="index"
      class="course-item"
      @click="handleCourseClick(item)"
    >
      <div class="img-box">
        <!-- 图片 -->
        <img :src="item.courseCover" alt="">
        <!-- 标签 -->
        <div class="tags">
          <span class="tag-item">{{item.sortParentName }}</span>
          <span class="tag-item">{{item.sortName }}</span>
        </div>
      </div>
      <p class="course-name">
        {{ item.title }}
      </p>
      <p class="info">
        <span>学习</span>
        <span>
          <i class="el-icon-user-solid"></i>
          {{ item.studyPersonNum }}
        </span>
        <span>
          <!-- 评分 -->
          <el-rate v-model="item.difficulty" class="star-box" disabled></el-rate>
        </span>
      </p>
    </li>
  </ul>
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
  data(){
    return{

    }
  },
  methods: {
    // 课程点击事件
    handleCourseClick () {
      this.$router.push({
        path:'/courseDetail',
        query:{ courseId:1 }})
    }
  }
}
</script>
<style lang="stylus" scoped>
  .star-box
    display: inline-block;
  .course-list
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .course-item
      position: relative;
      flex: 0 0 20%;
      margin-bottom: 32px;
      cursor: pointer;
      &:hover
        .course-name
          color: #f01414;
      .img-box
        position: relative;
        margin: 0 auto 8px;
        width: 216px;
        height: 120px;
        & > img
          display: inline-block;
          width: 100%;
          height: 100%;
          background-color: #eee;
        & > img
          border-radius: 8px;
          &:hover
            box-shadow: 0 12px 24px  rgba(7,17,27,0.1);
        .tags
          position: absolute;
          bottom: 12px;
          left: 8px;
          .tag-item
            margin-right: 10px;
            padding: 4px 8px;
            border-radius: 4px;
            color: #fff;
            font-size: 12px;
            background-color: rgba(28, 31, 33, 0.6);
      & > p
        padding: 0 8px;
        box-sizing: border-box;
      .course-name
        height: 46px;
        word-break: break-all;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: #1c1f21;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
      .info
        margin-top: 5px;
        font-size: 12px;
        color: #9199a1;
        line-height: 24px;
        & > span
          padding: 0 6px;
          &:first-child
            padding-left: 0;
        .icon-user
          margin-right: -2px;
          font-weight: 600;

</style>
