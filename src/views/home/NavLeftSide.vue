<template>
  <div class="home-nav-container">
    <!-- 导航 -->
    <ul class="home-nav" @mouseleave="handleMouseLeave">
      <li
        v-for="(oneSort,index) in oneLevelSort"
        :key="index"
        class="nav-item"
        @mouseenter="handleMouseEnter(oneSort)"
      >
        <span class="nav-title">{{ oneSort.name }}</span>
        <span class="arr-right" />
      </li>
    </ul>
    <!-- hover 浮现-->
    <div
      @mouseenter="handleContentEnter"
      @mouseleave="handleContentLeave"
    >
      <div class="nav-content" v-show="showNavContent">
        <div class="tags">
          <div  class="tags-item">
            <h2 class="title-box">
              <span class="title">{{currentOneLeveSort.name}}</span>
              <span class="line" />
            </h2>
            <ul class="list">
              <li
                      v-for="(towSort, index) in currentTwoLevelSort"
                      :key="index"
                      class="tag"
                      @click="clickSort(towSort)"
              >
                {{ towSort.name }}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {getAllCategoryList} from '@/api/sort/category'

export default {
  data () {
    return {
      allSorts:[], // 所有分类
      oneLevelSort:[],// 一级分类
      twoLevelSort:[],// 二级分类
      currentOneLeveSort:{}, // 当前一级分类
      currentTwoLevelSort:[], // 当前二级分类
      showNavContent: false

    }
  },

  methods: {
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
      this.oneLevelSort = [];
      this.twoLevelSort = [];
      for(let sort of this.allSorts){
        if(sort.level == 1){
          this.oneLevelSort.push(sort);
        }
        if(sort.level == 2){
          this.twoLevelSort.push(sort);
        }
      }
    },
    // 点击分类
    clickSort(sort){
      this.$router.replace({
        path:"/course",
        query:{ sortId:sort.id}
      })
    },
    // 导航鼠标移入
    handleMouseEnter (sort) {
      this.showNavContent = true;
      this.currentTwoLevelSort = [];
      this.currentOneLeveSort = sort;
      for(let sortItem of this.twoLevelSort){ // 遍历所有的二级分类
        if(sortItem.parentId == sort.id){ // 是一级分类的子分类
          this.currentTwoLevelSort.push(sortItem);
        }
      }
    },
    // 导航鼠标移除
    handleMouseLeave () {
      this.timer = setTimeout(() => {
        this.showNavContent = false
      }, 150)
    },
    // 导航内容鼠标移入
    handleContentEnter () {
      clearTimeout(this.timer)
    },
    // 导航内容鼠标移除
    handleContentLeave () {
      this.showNavContent = false;
    },

  },
  created() {
      // 获取分类列表
      this.getSortList();
  }

}
</script>

<style lang="stylus" scoped>

  .nav-content
    z-index: 100;
    position: absolute;
    top: 0;
    left: 216px;
    width: 768px;
    height: 444px;
    background-color: #fff;
    .tags
      position: relative;
      padding: 36px 48px 32px;
      .tags-item
        .title-box
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          color:  #f01414;
          font-size: 14px;
          line-height: 24px;
          font-weight: 700;
          .title
            margin-right: 20px;
          .line
            flex: 1;
            height: 1px;
            background-color: #eff1f0;
        .list
          .tag
            display: inline-block;
            margin-right: 16px;
            margin-bottom: 24px;
            font-size: 14px;
            color: #4d555d;
            cursor: pointer;
            &:hover
              color:  #f01414;

  /* */
  .home-nav-container
    position: relative;
    width: 216px;
    height: 444px;
    background-color:#2b333b;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 12px 24px 0 rgba(7,17,27,0.1);
    .home-nav
      position: absolute;
      left: 0;
      right: 0;
      top: 10px;
      .nav-item
        position: relative;
        margin-left: 12px;
        padding-left: 16px;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        color: rgba(255,255,255,0.6);
        cursor: pointer;
        .arr-right
          position: absolute;
          top: 50%;
          right: 10px;
          margin-top: -4px;
          display:inline-block;
          width: 0;
          height: 0;
          border: 4px solid rgba(255, 255, 255, 0.5);
          border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
        &:hover
          background-color: #6a7075;
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          color: #fff;
</style>
