<!-- home/about -->
<template>
  <div class="page-container">
    <van-nav-bar
      title="404"
      left-text="返回"
      left-arrow
      @click-left="gotoBack"
    >
    </van-nav-bar>
    <div class="error-page">404 页面没有找到</div>
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
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .error-page{
    width: 100vw;
    height: 70%;
    @include flexbox(center)
  }

</style>
