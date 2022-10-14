import Taro from '@tarojs/taro';
import request from '@/utils/request';
import { HOST } from './index';

// ? 获取微信用户令牌接口
export function code2Session(code: string) {
  return request.get({
    url: `${HOST}/auth/wx/token?jsCode=${code}`,
  });
}

// ? 登录接口
export function newLogin(data) {
  return request.post({ url: `${HOST}/auth/wx/login`, data });
}

// 获取用户信息
export function getUserInfo() {
  return request.get({
    url: `${HOST}/auth/wx/getUserByToken?token=${Taro.getStorageSync('token')}`,
  });
}
