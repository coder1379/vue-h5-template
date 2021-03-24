<!-- home/about -->
<template>
  <div>
    <van-nav-bar
      title="404"
      left-text="返回"
      left-arrow
      @click-left="gotoBack"
    >
    </van-nav-bar>
    <div style="width: 100vw;height: 70vh;" class="about">404 页面没有找到</div>
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
  .about{
    @include flexbox(center)
  }

</style>
