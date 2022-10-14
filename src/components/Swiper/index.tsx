import { Swiper, SwiperItem, Image } from '@tarojs/components';
import './index.less';
import Taro from '@tarojs/taro';

interface Prop {
  pic: string[];
}

const SwiperComponent = (props: Prop) => {
  const { pic } = props;

  // 图片预览
  const handlePreViewImg = (e, v) => {
    Taro.previewImage({
      current: e, // 当前显示图片的http链接
      urls: v, // 需要预览的图片http链接列表
    });
  };
  return (
    <Swiper
      className="swiperImage"
      indicatorColor="#D8D8D8" // ? 轮播下面所有圆圈显示样式
      indicatorActiveColor="#fff" // ? 轮播下面被选中圆圈显示样式
      vertical={false} // ? 滑动方向
      circular // ? 是否采用衔接滑动
      indicatorDots // ? 是否显示面板指示点
      interval={2000} // ? 自动切换时间间隔
      autoplay // ? 是否自动切换
    >
      {pic?.map((item, idx: number) => {
        return (
          <SwiperItem
            key={idx}
            className="swiperImage"
            onClick={() => handlePreViewImg(item, pic)}
          >
            <Image src={item} className="swiperImage" mode="aspectFit" />
          </SwiperItem>
        );
      })}
    </Swiper>
  );
};

export default SwiperComponent;
