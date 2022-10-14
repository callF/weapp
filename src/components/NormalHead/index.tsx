import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import styles from './index.module.less';

interface IProps {
  title: string;
}

const NormalHead = (props: IProps) => {
  const { title } = props;
  const [barH, setBarH] = useState('');
  const [barContentH, setBarContentH] = useState('');
  const [paddingT, setPaddingT] = useState('');
  useEffect(() => {
    setBarHeight();
  }, []);

  const setBarHeight = () => {
    const { statusBarHeight } = Taro.getSystemInfoSync();
    const { bottom, top } = Taro.getMenuButtonBoundingClientRect();
    const distance = top - statusBarHeight;
    setBarH(`${bottom + distance}px`);
    setBarContentH(`${bottom - top + distance * 2}px`);
    setPaddingT(`${top - distance}px`);
  };

  return (
    <View className={styles.normalHead} style={{ height: barH }}>
      <View className={styles.block} style={{ height: barH }} />
      <View
        className={styles.head}
        style={{ height: barH, paddingTop: paddingT }}
      >
        <View className={styles.title} style={{ lineHeight: barContentH }}>
          {title}
        </View>
      </View>
    </View>
  );
};

export default NormalHead;
