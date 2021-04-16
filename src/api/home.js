import api from './index'
// axios
import Qs from 'qs'
import request from '@/utils/request'

// 公共接口模块

// 直接拼接url调用接口 option 为其他参数例如 timeout等
export function callApiByUrl(url, requestJson, method = 'post', option = {}) {
  // requestJson = Qs.stringify(requestJson)
  const timeout = option.timeout ?? false // 如果有超时时间覆盖超时时间
  const dataObj = {
    url: url,
    method: method,
    data: requestJson,
    hideloading: true,
    contentType: 'json'
  }

  if (timeout) {
    dataObj.timeout = timeout
  }

  return request(dataObj)
}

