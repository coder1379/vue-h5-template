<!-- 我们 设置 -->
<template>
  <div class="page-container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onSave"
    >
      <template #title>
        {{title}}
      </template>
    <template #right>
      <van-icon name="down" size="18" />
    </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.meta.title
    }
  },
  activated() {
    console.log('activeed')
    if (this.$route.meta.keepAlive === true) {
      this.gotoScrollPosition() // 如果为需要缓存调整滚动条位置
    }
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      window.history.go(-1)
    },
    onSave() {
      this.$dialog.alert('保存成功')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
