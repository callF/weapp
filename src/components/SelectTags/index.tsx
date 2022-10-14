import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.less';

interface IProps {
  tabs: ICommon[];
  onChange: any;
  activeKey?: string;
}

const SelectTags = (props: IProps) => {
  const { tabs, onChange, activeKey } = props;

  const onTabChanged = (id: string) => {
    if (id === activeKey) {
      return;
    }
    onChange(id);
  };
  return (
    <View className={styles.selectTags}>
      {(tabs || []).map((item) => {
        const { name, id } = item;
        return (
          <View
            key={id}
            onClick={() => onTabChanged(id as string)}
            className={classNames(
              styles.tag,
              id === activeKey ? styles.active : '',
            )}
          >
            {name}
          </View>
        );
      })}
    </View>
  );
};

export default SelectTags;
