<!-- page name -->
<template>
  <div class="page-container">
    <div class="header-container">
      <van-nav-bar
        title="列表"
        left-text="返回"
        fixed
        left-arrow
        @click-left="gotoBack"
      />
    </div>
    <div class="body-container">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(item,index) in list" :key="index" :title="item" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { callApiByUrl } from '@/api/home.js'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
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
    onLoad() {
      // 主要替换接口调用及接口内 数组处理部分，其余相关参数可以不用调整
      callApiByUrl('/getcurrent1p.php', {}, 'GET').then((res) => {
        // 添加列表数据
        // 判断是否为刷新情况当前内容
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        // 数据处理
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 设置加载完成
        this.loading = false

        // 判断是否还有下一页处理
        if (this.list.length >= 40) {
          this.finished = true
        }
      }).catch((err) => {
        this.showException(err)
        this.loading = false
        this.refreshing = false
        this.finished = true
      })
    },
    onRefresh() {
      // 清空列表数据
      this.list = [] // 情况数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
