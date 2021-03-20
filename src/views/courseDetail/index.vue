<template>
  <div class="course-detail">
    <!-- 头部 -->
    <course-header/>
    <!-- 内容部分 -->
    <course-content :data="courseDetail" />
  </div>
</template>
<script>
import CourseHeader from './header.vue'
import CourseContent from './content.vue'

export default {
  name: 'CourseDetail',
  data () {
    return {
      courseDetail: {

      }
    }
  },
  mounted () {

  },
  methods: {
  },
  components: {
    CourseHeader,
    CourseContent
  }
}
</script>
