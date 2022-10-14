import { View, Text, Image } from '@tarojs/components';
import './index.less';
const look = require('@/assets/image/look.png');
const nozan = require('@/assets/image/nozan.png');
const zan = require('@/assets/image/zan.png');
const comm = require('@/assets/image/comm.png');

interface Props {
  id?: number;
  likeTimes?: number;
  viewTimes?: number;
  likeFlag?: Boolean;
  lookFlag?: Boolean;
  commFlag?: Boolean;
  callBackComm?: () => void;
  callBackLike?: (e: any, item: any) => void;
  callBackLook?: () => void;
}
const LookNum = (props: Props) => {
  const {
    id,
    callBackComm,
    callBackLike,
    callBackLook,
    likeFlag = true,
    lookFlag = true,
    commFlag = true,
    likeTimes = 0,
    viewTimes = 0,
  } = props;
  return (
    <View className="dff">
      {likeFlag ? (
        <View
          className="acc"
          onClick={(e) => callBackLike && callBackLike(e, id)}
        >
          <Image src={nozan} />
          <Text className="num">{likeTimes}</Text>
        </View>
      ) : null}
      {lookFlag ? (
        <View className="acc" onClick={() => callBackLook && callBackLook()}>
          <Image src={look} />
          <Text className="num">{viewTimes}</Text>
        </View>
      ) : null}
      {commFlag ? (
        <View className="acc" onClick={() => callBackComm && callBackComm()}>
          <Image src={comm} />
          <Text className="num">{40}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default LookNum;
