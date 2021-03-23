import api from './index'
// axios
import Qs from 'qs'
import request from '@/utils/request'

// 公共接口模块

// 直接拼接url调用接口
export function callApiByUrl(url, requestJson, method = 'post') {
  // requestJson = Qs.stringify(requestJson)
  return request({
    url: url,
    method: method,
    data: requestJson,
    hideloading: true,
    contentType: 'json'
  })
}

