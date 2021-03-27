<!-- 我的 -->
<template>
  <div class="page-container">
    我的页面
    <div>
      <van-button type="primary" @click="gotoPath('/my/set')">点击进入我的设置</van-button>
    </div>

    <div>
      <van-button type="info" @click="gotoPath('/login')">点击登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  activated() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
