import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.less';

interface IProps {
  listConfig: IDetailItem[];
  className?: string;
}

const DetailList = (props: IProps) => {
  const { listConfig, className } = props;
  const classes = classNames(styles.detailList, className);
  return (
    <View className={classes}>
      {listConfig.map((item, idx: number) => {
        const { label, value } = item;
        return (
          <View key={idx} className={styles.detailItem}>
            <View className={styles.label}>{label}：</View>
            <View className={styles.value}>{value}</View>
          </View>
        );
      })}
    </View>
  );
};

export default DetailList;
