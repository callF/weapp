import { View } from '@tarojs/components';
import { Fragment, useState } from 'react';
import styles from './index.module.less';

interface Porps {
  data: any;
  count: number; // 字数省略号
  desc: string; // 文本
  //   col: string; //显示行数
}

const CollapseText = (props: Porps) => {
  const { data, count, desc } = props;
  const [isShow, setIsShow] = useState<any>([]);
  const arr: any = [];
  const handleIsShow = (e, id, type) => {
    e.stopPropagation();
    if (type == 'open') {
      arr.push(id);
    } else {
      arr.splice(
        arr.findIndex((item) => (item = id)),
        1,
      );
    }
    setIsShow(arr);
  };

  return (
    <>
      <View className={styles.CollapseView}>
        <View
          className={`${
            isShow.includes(data.id) ? `${styles.desc1}` : `${styles.desc}`
          }`}
        >
          {desc}
        </View>
        {desc?.length > count ? (
          <>
            {!isShow.includes(data.id) ? (
              <View
                className={styles.gkl}
                onClick={(e) => handleIsShow(e, data.id, 'open')}
              >
                展开
              </View>
            ) : (
              <View
                className={styles.gkl}
                onClick={(e) => handleIsShow(e, data.id, 'off')}
              >
                收起
              </View>
            )}
          </>
        ) : null}
      </View>
    </>
  );
};

export default CollapseText;
