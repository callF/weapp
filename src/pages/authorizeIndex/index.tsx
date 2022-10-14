import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import { API_PREFIX_IMAGE } from '@/constants';

import { code2Session, newLogin } from '@/service/login';
import './index.css';
import CertificationModal from '@/components/CertificationModal';

const FooterLogo =
  'https://szzw001.oss-cn-hangzhou.aliyuncs.com/assetControl/app/foot-logo.png';
const Logo = `${API_PREFIX_IMAGE}/logo.png`;

const WXBizDataCrypt = require('@/utils/WXBizDataCrypt.js');

const AuthorizeIndex = () => {
  const [data, setData] = useState<any>();
  const [wxLoginInfo, setLoginInfo] = useState<any>({});
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // ? 用户授权 && 获取手机号
  const getPhoneNumber = (e) => {
    const { openid, session_key } = wxLoginInfo;
    const { encryptedData, iv } = e.detail;
    const pc = new WXBizDataCrypt(openid, session_key);
    const phoneInfo = pc.decryptData(encryptedData, iv);
    const { phoneNumber } = phoneInfo;
    setData({
      weChatId: openid,
      phoneNumber,
    });
  };

  useEffect(() => {
    // 不要放到获取手机号回调，防止code刷新失效
    Taro.login({
      async success(res) {
        if (res.code) {
          const result = await code2Session(res.code);
          if (result) {
            setLoginInfo(result);
          }
        } else {
          console.log(`登录失败！${res.errMsg}`);
        }
      },
    });
  }, []);

  const getUserProfile = () => {
    Taro.getUserProfile({
      desc: '社区',
      lang: 'zh_CN',
      success: async (_res) => {
        const { userInfo } = _res;
        const { avatarUrl, nickName } = userInfo;
        const response = await newLogin({
          ...data,
          avatarUrl,
          nickName,
        });
        if (!response.code) {
          Taro.setStorage({
            key: 'userInfo',
            data: response.userInfo,
          });
          Taro.setStorage({
            key: 'token',
            data: response.token,
          });
          Taro.reLaunch({
            url: '/pages/packageA/entry/index',
          });
        } else if (response.code === 401) {
          setIsOpened(true);
        }
      },
      fail: (e) => {},
    });
  };

  return (
    <View className="index-container">
      <View className="index-content">
        <View className="index-logo-text">欢迎使用 智治溪南</View>
        <View className="index-logo-text1">授权微信头像，昵称</View>
        <Image className="index-logo-img" src={Logo} />
        <View className="index-logo-text2">
          为提供优质服务，智治溪南需要获取你的以下信息
        </View>
        <View className="index-logo-text3">你的公开信息（头像，昵称等）</View>
        {!data ? (
          <AtButton
            className="index-logo-btn"
            type="primary"
            openType="getPhoneNumber"
            onGetPhoneNumber={getPhoneNumber}
          >
            获取手机号
          </AtButton>
        ) : (
          <AtButton
            className="index-logo-btn"
            type="primary"
            onClick={getUserProfile}
          >
            获取头像
          </AtButton>
        )}
      </View>
      <View className="index-footer">
        <Image className="index-footer-logo-img" src={FooterLogo} />
      </View>
      {isOpened ? (
        <CertificationModal isOpened={isOpened} setIsOpened={setIsOpened} />
      ) : (
        ''
      )}
    </View>
  );
};

export default AuthorizeIndex;
