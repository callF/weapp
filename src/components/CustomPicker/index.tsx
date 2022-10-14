import { Picker, View, Text } from '@tarojs/components';
import { FC, pxTransform } from '@tarojs/taro';
import { PickerSelectorProps } from '@tarojs/components/types/Picker';
import { AtIcon } from 'taro-ui';
import styles from './index.module.less';

interface IProps extends PickerSelectorProps {
  // 提示文案
  placeholder: string;
  // 宽度
  width?: number;
  range: any[];
  value: number;
}

const CustomPicker: FC<IProps> = (props) => {
  const { placeholder, width, range, value, ...args } = props;
  const viewWidth = width ? pxTransform(width) : undefined;

  // 显示的文本
  const pickerText = () => {
    const _label = range[value].label;
    if (_label) {
      return <Text className={styles.label}>{_label}</Text>;
    }
    return <Text className={styles.placeholder}>{placeholder}</Text>;
  };

  return (
    <Picker range={range} value={value} {...args}>
      <View style={{ width: viewWidth }} className={styles.wrapper}>
        {pickerText()}
        <AtIcon value="chevron-down" size={16} color="#808DA1" />
      </View>
    </Picker>
  );
};

export default CustomPicker;
