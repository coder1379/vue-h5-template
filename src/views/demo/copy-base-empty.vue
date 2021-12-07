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
import assign from '../../utils/assign' // ios微信分享问题处理方案
import { defalutWxShareBar, setWxBarButton } from '../../utils/wxCommon'
import { actionInitEndBack, checkToWxLogin } from '../../utils/common' // ios微信分享页面不刷新处理方案,不需要删除即可

export default {
  mixins: [assign], // ios微信分享页面不刷新处理方案,不需要删除即可
  data() {
    return {

    }
  },
  computed: {
  },
  mounted() {
    checkToWxLogin(this.$route.fullPath) // 检查微信并跳转
    actionInitEndBack(this.$route.fullPath) // 加入到百度统计
    setWxBarButton('测试微信分享', '测试微信分享', location.href, '', defalutWxShareBar) // 设置微信按钮
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
