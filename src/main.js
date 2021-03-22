// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 缓存页面及页面滚动条 封装 start
Vue.prototype.scrollPositionList = {} // 全局路由滚动条位置保存

/**
 * @param path 指定路径 如果为null 则自动获取
 * @param positionY 指定位置 如果为null 则自动获取
 */
Vue.prototype.setScrollPosition = function(path = null, positionY = null) {
  // 统一设置滚动条位置
  let routePath = path
  if (path == null) {
    routePath = this.$route.path // 不传参数默认为vue当前路由地址
  }
  let currentPosition = positionY
  if (positionY == null) {
    currentPosition = (document.documentElement.scrollTop || document.body.scrollTop)
  }
  console.log('current scroll:' + currentPosition)
  this.scrollPositionList[routePath] = currentPosition
}

/**
 * @param positonY 指定位置 如果为null 则获取scrollPositionList中保存值
 */
Vue.prototype.gotoScrollPosition = function(positionY = null) {
  // 跳转到滚动条指定位置
  let scrollY = positionY
  const routePath = this.$route.path
  if (positionY == null) {
    scrollY = this.scrollPositionList[routePath] ?? 0
  }
  console.log('goto scroll:' + scrollY)
  document.documentElement.scrollTop = scrollY // 滚动条位置设置
  document.body.scrollTop = scrollY // document.body.scrollTop 兼容苹果滚动
}
// 缓存页面及页面滚动条 封装 end

Vue.prototype.gotoPath = function(path) {
  // 快捷跳转路由封装
  this.$router.push({ path: path })
}
// 路由快捷跳转封装 end

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'

// 引入 vant 全局样式覆盖文件
import '@/assets/css/vant-overwrite.scss'

// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
