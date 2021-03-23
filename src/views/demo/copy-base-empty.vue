<!-- page name -->
<template>
  <div><!--空页面用于快速复制--></div>
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
    // 需要缓存的页面手动加入滚动条处理 不缓存可删除
    if (this.$route.meta.keepAlive === true) {
      this.gotoScrollPosition()
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
