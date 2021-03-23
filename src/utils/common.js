import { baseUrl } from '@/config'

/**
 * 跳转登录页面并设置登录成功后的回跳地址
 * @param {string} backPath 回跳地址,不含baseUrl地址
 * @returns {Boolean}
 */
export function gotoLogin(backPath) {
  if (backPath) {
    if (backPath.indexOf('http') === 0) {
      localStorage.setItem('fullPath', backPath)
    } else {
      localStorage.setItem('fullPath', baseUrl + backPath)
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
  const token = localStorage.getItem('token') ?? ''
  if (!token) {
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
  return true
}

