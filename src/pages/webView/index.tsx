import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { WebView } from '@tarojs/components';

const WebViewIndex = () => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    const params = Taro.getCurrentInstance();
    const url = params?.router?.params.url;
    if (url) {
      setUrl(url);
    } else {
      Taro.showToast({
        title: '暂未开发奥',
        icon: 'none',
        duration: 1000,
      });
    }
  }, []);
  return <WebView src={url} />;
};

export default WebViewIndex;
