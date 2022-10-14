import Taro from '@tarojs/taro';
import { request } from '../utils/index';
import { api3 } from './index';

// ? 获取微信用户令牌接口
export function code2Session(code: string) {
  return request({
    url: `${api3}/auth/wx/token?jsCode=${code}`,
    method: 'GET',
  });
}

// ? 登录接口
export function newLogin(data) {
  return request({ url: `${api3}/auth/wx/login`, data, hideToast: true });
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: `${api3}/auth/wx/getUserByToken?token=${Taro.getStorageSync('token')}`,
    method: 'GET',
    hideToast: true,
  });
}
