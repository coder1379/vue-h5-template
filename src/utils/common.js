import { baseUrl } from '@/config'

// 项目token名称
export const productTokenName = 'prodect-token'

/**
 * 跳转登录页面并设置登录成功后的回跳地址
 * @param {string} backPath 回跳地址,不含baseUrl地址
 * @returns {Boolean}
 */
export function gotoLogin(backPath) {
  if (backPath) {
    if (backPath.indexOf('http') === 0) {
      setLocalCache('fullPath', backPath)
    } else {
      setLocalCache('fullPath', baseUrl + backPath)
    }
  }
  location.href = baseUrl + '/login'
  return true
}

// 设置本地token
export function setToken(val) {
  return localStorage.setItem(productTokenName, val)
}

// 获取本地token
export function getToken() {
  return localStorage.getItem(productTokenName)
}

// 设置本地缓存
export function setLocalCache(name, val) {
  return localStorage.setItem(name, val)
}

// 获取本地缓存
export function getLocalCache(name) {
  return localStorage.getItem(name)
}

// 删除本地缓存
export function deleteLocalCache(name) {
  return localStorage.removeItem(name)
}

// 判断是否为空 包含对象数组 类似php empty
export function empty(parm) {
  if (parm == null || parm == undefined || parm == 0 || parm == '' || parm == 'undefined' || parm == ' ' || parm == 'null' || /^[ ]+$/.test(parm) || JSON.stringify(parm) === '{}' || JSON.stringify(parm) === '[]') {
    return true
  } else {
    return false
  }
}

// 是否为空验证
export function isNull(parm) {
  if (parm == '' || parm == 'undefined' || parm == undefined || parm == null || parm == ' ' || parm == 'null') {
    return true
  } else {
    return false
  }
}

/**
 * 检查登录状态
 * @param toLogin 1 = 未登录直接登录
 * @param backPath
 */
export function checkLogin(toLogin, backPath) {
  const token = getToken()
  if (empty(token)) {
    if (toLogin === 1) {
      gotoLogin(backPath)
    }
    return false
  } else {
    return true
  }
}

/**
 * 统一获取userid便于后续维护
 * @returns {string | null}
 */
export function getUserId() {
  return 0
}

/**
 * 清除登录
 * @returns {string | null}
 */
export function clearUserLoginInfo() {
  deleteLocalCache(productTokenName) // 清除token
  return true
}

