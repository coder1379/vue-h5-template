<!-- page name -->
<template>
  <div class="page-container">
    <div class="header-container">
      <van-nav-bar
        title="标题"
        left-text="返回"
        fixed
        left-arrow
        @click-left="gotoBack"
      />
    </div>
    <div class="body-container">
      <!--主题内容-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
  },
  mounted() {
  },
  activated() {
    // 需要缓存的页面手动加入滚动条处理 不缓存可删除 activated
    if (this.$route.meta.keepAlive === true) {
      this.gotoScrollPosition()
    }
  },
  /* beforeRouteLeave(to, from, next) {
    // 非缓存页面可直接删除beforeRouteLeave
     if (from.meta.keepAlive === true) { // 由于部分html结构问题导致需要单独处理滚动条位置
       this.setScrollPosition(null, this.$refs.page - scroll - container.scrollTop)
    }
    next()
  },*/
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
