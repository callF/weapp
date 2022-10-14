import { View, Image, Text } from '@tarojs/components';
import './index.less';

const zan = require('@/assets/image/zan.png');
const nozan = require('@/assets/image/nozan.png');
const comm = require('@/assets/image/comm.png');

interface Props {
  data: any;
  id: number;
  callBackComm: () => void;
  callBackLike: () => void;
}
const CommAndLikeDom = (props: Props) => {
  const { callBackComm, id, callBackLike, data } = props;
  return (
    <View className="commStyle">
      <View className="commStyle_item" onClick={() => callBackComm()}>
        <Image src={comm} />
        <Text className="text">评论</Text>
      </View>
      <View className="commStyle_item" onClick={callBackLike}>
        <Image src={data?.likesStatus == 0 ? nozan : zan} />
        <Text className="text">点赞</Text>
      </View>
    </View>
  );
};

export default CommAndLikeDom;
