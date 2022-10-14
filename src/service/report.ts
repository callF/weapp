import Taro from '@tarojs/taro';
import { HOST } from './index';

// ? 录音
export function submitAudio(data, callback) {
  const { path } = data;
  Taro.uploadFile({
    url: `${HOST}/ossOpt/upload/file`,
    filePath: path,
    name: 'file',
    success: (result) => {
      const { statusCode, errMsg, data } = result;
      let obj = {};
      if (statusCode === 200) {
        const jsonData = JSON.parse(data);
        const { code, message } = jsonData;
        const audioUrl = jsonData?.data?.resourceUrl;
        obj = {
          statusCode: code,
          errMsg: message,
          audioUrl,
        };
      } else {
        obj = {
          statusCode,
          errMsg,
        };
      }
      callback && callback(obj);
    },
  });
}

// 上传图片
export function uploadImage(data) {
  const { path } = data;
  // 图片多个上传
  if (Array.isArray(path)) {
    const promiseArr = path.map((src) => {
      return new Promise((resolve, reject) => {
        Taro.uploadFile({
          url: `${HOST}/ossOpt/img/upload`,
          filePath: src,
          name: 'file',
          success(result) {
            const { statusCode, errMsg, data } = result;
            if (statusCode === 200) {
              const jsonData = JSON.parse(data);
              const { code, message } = jsonData;
              const { attachPath } = jsonData.data[0];
              if (code) {
                resolve(<string>attachPath);
              } else {
                reject(message);
              }
            }
          },
        });
      });
    });
    return new Promise((resolve, reject) => {
      Promise.all(promiseArr)
        .then((res: string[]) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          Taro.showToast({
            title: '上传失败',
            icon: 'none',
          });
        });
    });
  }
}
// 上传视频
export function uploadVideo(data) {
  const { path } = data;

  // 图片多个上传
  if (Array.isArray(path)) {
    const promiseArr = path.map((src) => {
      return new Promise((resolve, reject) => {
        Taro.uploadFile({
          url: `${HOST}/ossOpt/upload/file`,
          filePath: src?.tempFilePath,
          name: 'file',
          success(result) {
            const { statusCode, errMsg, data } = result;
            if (statusCode === 200) {
              Taro.hideLoading();
              const jsonData = JSON.parse(data);
              const { code, message } = jsonData;
              const { resourceUrl } = jsonData.data;
              if (code) {
                resolve(<string>resourceUrl);
              } else {
                reject(message);
              }
            }
          },
        });
      });
    });
    return new Promise((resolve, reject) => {
      Promise.all(promiseArr)
        .then((res: string[]) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          Taro.showToast({
            title: '上传失败',
            icon: 'none',
          });
        });
    });
  }
}
