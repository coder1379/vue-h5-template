import { baseUrl } from '@/config'

// 项目缓存前缀 防止重名
export const productCachePrefix = 'vht-'

// 设置本地缓存 自动加入项目前缀 写本地缓存只使用此方式
export function setLocalCache(name, val) {
  return localStorage.setItem(productCachePrefix + name, val)
}

// 获取本地缓存 自动加入项目前缀 读本地缓存只使用此方式
export function getLocalCache(name) {
  return localStorage.getItem(productCachePrefix + name)
}

// 删除本地缓存
export function deleteLocalCache(name) {
  return localStorage.removeItem(productCachePrefix + name)
}

// 设置本地token
export function setToken(val) {
  return setLocalCache('token', val)
}

// 获取本地token
export function getToken() {
  return getLocalCache('token')
}

// 设置用户类型
export function setUserType(val) {
  return setLocalCache('userType', val)
}

// 获取用户类型
export function getUserType() {
  return getLocalCache('userType')
}

// 设置项目userId
export function setUserId(val) {
  return setLocalCache('userId', val)
}

// 获取项目userId
export function getUserId() {
  return getLocalCache('userId')
}

/**
 * 清除登录信息 仅用户登录相关，其他非用户状态 另行清理
 * @returns {string | null}
 */
export function clearUserLoginInfo() {
  deleteLocalCache('token') // 清除token
  deleteLocalCache('userId')
  deleteLocalCache('userType')
  return true
}

/**
 * 设置用户登录信息 包含游客，注意保持与clearUserLoginInfo 清理内容相同 非用户状态信息另行设置
 * @returns {boolean}
 */
export function setUserLoginInfo(dataObj) {
  if (dataObj && dataObj.code === 200) {
    clearUserLoginInfo()
    setToken(dataObj.data.token)
    setUserId(dataObj.data.id)
    setUserType(dataObj.data.user_type)
  }
  return true
}

/**
 * 跳转登录页面并设置登录成功后的回跳地址
 * @param {string} backPath 回跳地址,不含baseUrl地址
 * @returns {Boolean}
 */
export function gotoLogin(backPath) {
  clearUserLoginInfo()
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

