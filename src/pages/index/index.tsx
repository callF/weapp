import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { API_PREFIX_IMAGE } from '@/constants';

import './index.css';
import { getUserInfo } from '@/service/login';

const Logo = `${API_PREFIX_IMAGE}/logo.png`;
const FooterLogo = `${API_PREFIX_IMAGE}/footerLogo.png`;

const Index = () => {
  useEffect(() => {
    Taro.reLaunch({
      url: '/pages/packageA/entry/index',
    });
  }, []);
  useEffect(() => {
    // 通过token更新登录人数据
    if (Taro.getStorageSync('token')) {
      getUserInfo().then((res) => {
        if (!res.code) {
          Taro.setStorage({
            key: 'userInfo',
            data: res,
          });
        } else {
          Taro.clearStorage();
        }
      });
    }
  }, []);
  return (
    <View className="index-container">
      <View className="index-content">
        <View className="index-content-box">
          <Image className="index-logo-img" src={Logo} />
          <View>
            <Text className="index-logo-text">智慧社区 武义溪南</Text>
          </View>
        </View>
      </View>
      <View className="index-footer">
        <Image className="index-footer-logo-img" src={FooterLogo} />
      </View>
    </View>
  );
};

export default Index;
