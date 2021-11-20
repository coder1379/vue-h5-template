import api from './index'
import { baseApi } from '@/config'
import request from '../utils/request'
import { getToken, gotoLogin, setUserLoginInfo } from '../utils/common'
import { Toast } from 'vant'

/**
 * 基础接口模块
 */

// api接口 用户权限处理层 判断是否由于权限访问
export function apiCallProcess(url, requestObj, option = {}) {
  console.log(10)

  return requestHandle(url, requestObj, option).then((resData) => {
    if (resData && resData.code > 0) {
      // 返回接口调用成功
      if (resData.code === 200) {
        return Promise.resolve(resData)
      } else if (resData.code === 401) {
        // 去登录
        gotoLogin(location.href)
        return Promise.reject(resData)
      } else if (resData.code === 422) {
        // 获取游客
        console.log(422)
        return getAccessLoadInfo().then((resData422) => {
          console.log(422 + 'success')
          if (resData422.code === 200) {
            if (resData422.data.same != 1) {
              // 写入用户登录信息
              setUserLoginInfo(resData422)
            }

            return requestHandle(url, requestObj, option).then((resReCallData) => {
              if (resReCallData && resReCallData.code === 200) {
                return Promise.resolve(resReCallData)
              } else if (resReCallData && resReCallData.code === 401) {
                gotoLogin(location.href)
                return Promise.reject(resReCallData)
              } else {
                // 失败
                return Promise.reject(resReCallData)
              }
            })
          } else {
            // 失败
            return Promise.reject(resData422)
          }
        })
      } else if (resData.code === 402) {
        // 续签
        return getUserRenewal().then((resData402) => {
          if (resData402.code === 200) {
            if (resData402.data.same != 1) {
              // 写入用户登录信息
              setUserLoginInfo(resData402)
            }
            return requestHandle(url, requestObj, option).then((resReCallData) => {
              if (resReCallData && resReCallData.code === 200) {
                return Promise.resolve(resReCallData)
              } else if (resReCallData && resReCallData.code === 401) {
                gotoLogin(location.href)
                return Promise.reject(resReCallData)
              } else {
                // 失败
                return Promise.reject(resReCallData)
              }
            })
          } else if (resData402.code === 401) {
            gotoLogin(location.href)
            return Promise.reject(resData402)
          } else {
            // 拒绝
            return Promise.reject(resData)
          }
        })
      } else {
        // 拒绝
        return Promise.reject(resData)
      }
    } else {
      return Promise.reject('server error,please try again!')
    }
  })
}

// 获取游客加载信息
export function getAccessLoadInfo() {
  const dataObj = {
    baseURL: baseApi,
    url: '/account/visitortoken',
    data: getDeviceInfo(),
    hideloading: true
  }
  return request(dataObj)
}

// 续签
export function getUserRenewal() {
  return requestHandle('/account/renewal', getDeviceInfo())
}

/**
 * 请求处理封装 业务成功失败处理层,判断成功，登录，异常
 * 接口  contentType 默认 application/x-www-form-urlencoded,枚举 ：json=json模式,formData=包含二进制文件模式 multipart/form-data
 * @param url 接口地址
 * @param requestObj 参数
 * @param option 其他参数 timeout,loading=是否弹出加载,method,contentType
 */
export function requestHandle(url, requestObj, option = {}) {
  console.log(34)

  const timeout = option.timeout ?? null // 如果有超时时间覆盖超时时间
  const loading = option.loading ?? false // 显示加载弹窗 默认不显示
  const methodStr = option.method ?? 'POST'
  const contentType = option.contentType ?? null

  // 不传递默认开启loading
  if (loading === true) {
    // loading
    Toast.loading({
      forbidClick: true
    })
  }

  requestObj.token = getToken()

  const dataObj = {
    baseURL: baseApi,
    url: url,
    method: methodStr,
    data: requestObj
  }
  if (timeout) {
    dataObj.timeout = timeout
  }
  if (contentType) {
    dataObj.contentType = contentType
  }
  return request(dataObj)
}

// 获取设备信息
export function getDeviceInfo() {
  return { device_type: 1, device_code: '123123', system: 'ios', model: 'ipod' }
}

/**
 *直接拼接url调用接口 option 为其他参数例如 timeout等
 * @param url 接口地址
 * @param requestObj 参数
 * @param option 其他参数 timeout,hideloading,method,contentType
 */
export function callApiByUrl(url, requestObj, option = {}) {
  return apiCallProcess(url, requestObj, option)
}

// 登录
export function login(data) {
  return apiCallProcess(api.userLogin, data)
}

// 用户信息 post 方法
export function getUserDetail(data) {
  return apiCallProcess(api.userDetail, data)
}

// 获取page参数
export function getPageDetail(data) {
  console.log(70)
  return apiCallProcess(api.pageDetail, data)
}

