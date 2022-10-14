import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.less';

interface Prop {
  title: string;
  text: any;
  className?: string;
}

export default function Line(props: Prop) {
  const { title, text, className } = props;

  return (
    <View className={classNames(styles.box, className)}>
      <View className={styles.title}>{title}</View>
      <View className={styles.text}>{text}</View>
    </View>
  );
}
