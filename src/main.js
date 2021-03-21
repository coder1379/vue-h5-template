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
Vue.prototype.routePathScrollSave = {} // 全局路由滚动条位置保存
Vue.prototype.setRoutePathScrollPosition = function(path) {
  // 统一设置滚动条位置
  if (!path) {
    path = this.$route.path // 不传参数默认为vue当前路由地址
  }
  this.routePathScrollSave[path] = (document.documentElement.scrollTop || document.body.scrollTop)
}

Vue.prototype.routerPush = function(parms) {
  // 统一路由push函数
  this.$router.push(parms)
}

Vue.prototype.toPath = function(path) {
  // 统一路由直接path跳转网页,参数复杂可使用 routerPush
  this.$router.push({ path: path })
}

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
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
