import api from './index'
// axios
import Qs from 'qs'
import request from '@/utils/request'

// 用户相关接口模块

// 登录
export function login(data) {
  return request({
    url: api.userLogin,
    method: 'post',
    data
  })
}

// 用户信息 post 方法
export function getUserInfo(data) {
  return request({
    url: api.userUserInfo,
    method: 'post',
    data,
    hideloading: true
  })
}

