import { View, Image, Text } from '@tarojs/components';
import './index.less';

interface Props {
  text: string;
  icon: string;
  flag: any;
  handleAppIconClick: (val: string) => void;
}

const AppIcon = ({ text, icon, handleAppIconClick, flag }: Props) => {
  const handleClick = () => {
    handleAppIconClick(text);
  };
  return (
    <View className="appIcon" onClick={handleClick}>
      <Image className="icon" src={icon} />
      <Text className={`text ${flag != undefined ? 'text1' : ''}`}>{text}</Text>
    </View>
  );
};
export default AppIcon;
