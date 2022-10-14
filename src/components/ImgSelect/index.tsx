import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { uploadImage } from '@/service/report';
import './index.less';
import { API_PREFIX_IMAGE } from '@/constants';

const Delete = `${API_PREFIX_IMAGE}/delete.png`;
const Upload = `${API_PREFIX_IMAGE}/upload.png`;

type Props = {
  limit: number;
  imgList: Array<any>;
  text?: string;
  onChangeImage: (imgList: Array<string>) => void;
};

const PersonSelect = (props: Props) => {
  const { limit = 1, onChangeImage, imgList = [], text } = props;
  const handleChangeImage = () => {
    const count = limit - imgList.length;
    if (count <= 0) {
      Taro.showToast({
        icon: 'none',
        title: '超过上传数量',
      });
    } else {
      Taro.chooseImage({
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > count) {
            Taro.showToast({
              icon: 'none',
              title: '超过上传数量',
            });
            return;
          }
          uploadImage({
            path: tempFilePaths,
          })?.then((res: any) => {
            onChangeImage([...imgList, ...res]);
          });
        },
      });
    }
  };

  const handleDeleteImage = (index) => {
    const _imageList = JSON.parse(JSON.stringify(imgList));
    _imageList.splice(index, 1);
    onChangeImage(_imageList);
  };

  // 图片预览
  const handlePreView = (e) => {
    Taro.previewImage({
      current: e, // 当前显示图片的http链接
      urls: imgList, // 需要预览的图片http链接列表
    });
  };

  return (
    <View className="imageSelect">
      <View className="imageList">
        {imgList.map((item, index) => {
          return (
            <View className="imageItem" key={index}>
              <Image
                src={item}
                className="upImage"
                onClick={() => handlePreView(item)}
              />
              <Image
                onClick={() => handleDeleteImage(index)}
                src={Delete}
                className="deleteImage"
              />
            </View>
          );
        })}
        {imgList.length < limit ? (
          <View className="upload" onClick={handleChangeImage}>
            <Image src={Upload} className="UploadIcon" />
            <Text className="text">{text ?? `最多上传${limit}张`}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default PersonSelect;
