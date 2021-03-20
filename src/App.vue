<template>
  <div id="app">
    <div class="wContainer">
      <!-- 头部-->
      <div class="wHeader">
          <w-header/>
      </div>
      <!-- 主体 -->
      <div class="wMain">
        <router-view/>
      </div>
      <!-- 底部 -->
      <div class="wFooter">
        <w-footer/>
      </div>
    </div>

  </div>
</template>

<script>
import WHeader from '@/components/Header'
import WFooter from '@/components/Footer'
export default {
  name: 'app',
  components: {
    WHeader,
    WFooter
  }
}
</script>
<style lang="stylus" scoped>
  .wHeader
    box-sizing: border-box;
    height: 75px;
    flex: 0 0 75px;
</style>
