import { useState } from 'react';
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { View } from '@tarojs/components';
import TabBar from './TabBar';
import './index.less';
import NormalHead from '@/components/NormalHead';

const Entry = () => {
  const [current, setCurrent] = useState(0);
  const handleCurrent = (num: number) => {
    setCurrent(num);
  };

  // useShareAppMessage((res) => {
  //   if (res.from === 'button') {
  //     // console.log('111111');
  //   }
  //   return {
  //     title: '智治溪南',
  //     path: '/pages/packageA/entry/index',
  //   };
  // });

  // useShareTimeline(() => {});
  return (
    <View className={`entry f-${current}`}>
      <NormalHead
        title={current === 0 ? '智治溪南' : current === 1 ? '服务' : '我的'}
      />
      <View className="entry-content">
        {/* {current === 0 ? <Home /> : current === 1 ? <Serve /> : <My />} */}
      </View>
      <TabBar selectCurrent={current} callBack={handleCurrent} />
    </View>
  );
};

export default Entry;
