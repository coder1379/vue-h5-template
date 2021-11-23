// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn, title } from '@/config'
Vue.prototype.$cdn = $cdn
// 设置js中直接使用配置的项目title 目前用于路由守卫动态设置title
Vue.prototype.$title = title

// 缓存页面及页面滚动条 封装 start
Vue.prototype.scrollPositionList = {} // 全局路由滚动条位置保存

// 缓存页面是否刷新全局变量 封装 start
Vue.prototype.refreshPositionList = {}

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

// 设置缓存页面进入后刷新 默认是设置为不刷新，false
Vue.prototype.setRefreshStaticPage = function(path = null, refresh = false) {
  // 设置指定页面下次进入是否刷新
  let routePath = path
  if (path == null) {
    routePath = this.$route.path // 不传参数默认为vue当前路由地址
  }
  this.refreshPositionList[routePath] = refresh
}

// 获取页面进入后是否刷新的值
Vue.prototype.getRefreshStaticPage = function(path = null) {
  let routePath = path
  if (path == null) {
    routePath = this.$route.path // 不传参数默认为vue当前路由地址
  }
  return this.refreshPositionList[routePath]
}

// 返回上一页 方便调用
Vue.prototype.gotoBack = function() {
  window.history.go(-1)
}

Vue.prototype.gotoPath = function(path) {
  // 快捷跳转路由封装
  this.$router.push({ path: path })
}
// 路由快捷跳转封装 end

// 全局统一异常处理，个性化自行在指定页面重写
Vue.prototype.showException = function(err) {
  console.log(err)
  if (typeof (err) === 'string') {
    this.$toast(err)
  } else if (err.msg) {
    this.$toast(err.msg)
  } else {
    this.$toast(err.message)
  }
}

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log(1)

  // 需要全局基本权限验证时使用,例如权限，游客，微信登录等 根据需求调整

  if (isWeiXin()) {
    // 微信内 自行扩展微信内是否登录业务
  }

  // 如需用户权限校验自行扩展权限校验业务
  // 例如

  // 设置页面跳转前的缓存参数
  if (from.meta.keepAlive === true) {
    console.log('被缓存路由:' + from.path)
    if (from.meta.excludeScroll !== true) {
      vue.setScrollPosition() // 如果为需要缓存页面则设置当前滚动条位置 如果由于html结构问题改为页面中beforeRouteLeave自行处理
    }
  }

  // 游客权限相关检查区域
  if (needCheckVisitorAuth(to.path)) {
    // 需要进行游客权限检查
    const isValidityTokenTimeVal = isValidityTokenTime()
    if (isValidityTokenTimeVal === true) {
      next()
    } else if (isValidityTokenTimeVal === 402) {
      // 续签
      getUserRenewal().then((res) => {
        console.log('续签')
        console.log(res)
        if (res.code === 200) {
          if (res.data.same == 1) {
            setLocalCache('tokenOutTime', getTimeStamp() + parseInt(res.data.ex_sp))
          } else {
            setUserLoginInfo(res)
          }
          next()
        } else {
          vue.showException('服务器连接异常，请重试')
        }
      }).catch((err) => {
        vue.showException(err)
      })
    } else {
      // 无效重新获取游客token
      getAccessLoadInfo().then((res) => {
        console.log('游客')
        console.log(res)
        if (res.code === 200) {
          setUserLoginInfo(res)
          console.log(4)
          next()
        } else {
          vue.showException('服务器连接异常，请重试')
        }
      }).catch((err) => {
        vue.showException(err)
      })
    }
  } else {
    next()
  }

  /* // 无权限验证时直接简单使用
  if (from.meta.keepAlive === true) {
    console.log('被缓存路由:' + from.path)
    if (from.meta.excludeScroll !== true) {
      vue.setScrollPosition() // 如果为需要缓存页面则设置当前滚动条位置 如果由于html结构问题改为页面中beforeRouteLeave自行处理
    }
  }
  next()*/
})

// 路由后置守卫 目前主要用于动态设置标题
router.afterEach((to, from) => {
  if (to.meta.title) {
    // 动态设置标题
    document.title = to.meta.title + '-' + vue.$title
  }
})

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'

// 引入 vant 全局样式覆盖文件
import '@/assets/css/vant-overwrite.scss'

// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters/index'
import {
  isValidityTokenTime,
  isWeiXin,
  needCheckVisitorAuth,
  setUserLoginInfo,
  setLocalCache, getTimeStamp
} from './utils/common'
import { getAccessLoadInfo, getUserRenewal } from './api/base'
Vue.config.productionTip = false

// vue 变量在全局路由守卫中会进行使用
const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
