import { View, Text, Image } from '@tarojs/components';
import { API_PREFIX_IMAGE } from '@/constants';

import './index.less';

const HomeNormal = `${API_PREFIX_IMAGE}/HomeNormal.png`;
const HomeSelect = `${API_PREFIX_IMAGE}/HomeSelect.png`;

const ServeNormal = `${API_PREFIX_IMAGE}/ServeNormal.png`;
const ServeSelect = `${API_PREFIX_IMAGE}/ServeSelect.png`;

const MyNormal = `${API_PREFIX_IMAGE}/MyNormal.png`;
const MySelect = `${API_PREFIX_IMAGE}/MySelect.png`;

const tabList = [
  { tabName: '首页', normalIcon: HomeNormal, selectIcon: HomeSelect },
  { tabName: '服务', normalIcon: ServeNormal, selectIcon: ServeSelect },
  { tabName: '我的', normalIcon: MyNormal, selectIcon: MySelect },
];
const TabBar = (props: any) => {
  const { callBack, selectCurrent } = props;
  return (
    <View className="tabbar">
      <View className="tabbar-list">
        {tabList.map((item, index) => {
          return (
            <View
              key={item.tabName}
              className="tabber-item"
              onClick={() => {
                callBack(index);
              }}
            >
              <Image
                src={
                  selectCurrent === index ? item.selectIcon : item.normalIcon
                }
                className="tabber-item-img"
              />
              <Text
                className={
                  selectCurrent === index
                    ? 'tabber-item-text-select'
                    : 'tabber-item-text-normal'
                }
              >
                {item.tabName}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
