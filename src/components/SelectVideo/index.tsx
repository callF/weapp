import { View, Image, Text, Video } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { uploadVideo } from '@/service/report';
import './index.less';
import { API_PREFIX_IMAGE } from '@/constants';

const Delete = `${API_PREFIX_IMAGE}/delete.png`;
const Upload = `${API_PREFIX_IMAGE}/upload.png`;

type Props = {
  limit: number;
  videoList: Array<any>;
  text?: string;
  onChangeVideo: (videoList: Array<string>) => void;
};

const SelectVideo = (props: Props) => {
  const { limit, onChangeVideo, videoList, text } = props;
  const handleChangeVideo = () => {
    const count = limit - videoList.length;
    if (count <= 0) {
      Taro.showToast({
        icon: 'none',
        title: '超过上传数量',
      });
    } else {
      Taro.chooseMedia({
        mediaType: ['video'],
        sourceType: ['album', 'camera'],
        success(res: any) {
          Taro.showLoading({
            title: '正在上传...',
          });
          const tempFilePaths = res.tempFiles;
          if (tempFilePaths?.length > limit) {
            Taro.showToast({
              icon: 'none',
              title: '超过上传数量',
            });
            return;
          }
          uploadVideo({
            path: tempFilePaths,
          })?.then((res: any) => {
            onChangeVideo([...videoList, ...res]);
          });
        },
      });
    }
  };

  const handleDeleteVideo = (index) => {
    const _imageList = JSON.parse(JSON.stringify(videoList));
    _imageList.splice(index, 1);
    onChangeVideo(_imageList);
  };

  return (
    <View className="imageSelect">
      <View className="imageList">
        {videoList.map((item, index) => {
          return (
            <View className="imageItem" key={index}>
              <Video src={item} className="upImage" />
              <Image
                onClick={() => handleDeleteVideo(index)}
                src={Delete}
                className="deleteImage"
              />
            </View>
          );
        })}
        {videoList.length < limit ? (
          <View className="upload" onClick={handleChangeVideo}>
            <Image src={Upload} className="UploadIcon" />
            <Text className="text">{text ?? '上传视频'}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default SelectVideo;
