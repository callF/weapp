import Taro from '@tarojs/taro';
import { objUtils } from '@szsk/utils';

const request = (parameter: any) => {
  const { url, method = 'POST', data: _params, hideToast } = parameter;
  objUtils.removeNull(_params || {});
  Object.assign(parameter, {
    data: _params,
    method,
    url,
  });

  return Taro.request(parameter)
    .then((response: any) => {
      const { code, data, message } = response.data;
      // 接口返回200表示成功
      // 后端返回1表示未登录,跳转登录页面
      // 426 未注册权限关闭  416 密码账号失败 424 验证未通过
      if (code === 200) {
        if (data) {
          return data;
        }
        return {
          successCode: 1,
        };
      }
      if (hideToast) {
        return response.data;
      }
      if (code === 303) {
        // 未完成业主认证
        Taro.showModal({
          title: '提示',
          content: message,
          showCancel: false,
        });
        return response.data;
      }
      if (code !== 200 && code !== 424 && code !== 426) {
        Taro.showModal({
          title: '提示',
          content: message || '系统异常，请稍后重试',
          showCancel: false,
        });
        return response.data;
      }
      (async () => {
        await Taro.showToast({
          title: message || '账号冻结，请联系管理员',
          icon: 'error',
          duration: 5000,
        });
        const timer = setTimeout(() => {
          if (code === 426) {
            Taro.reLaunch({
              url: '../authorizeIndex/index',
            });
          } else if (code === 424) {
            Taro.reLaunch({
              url: '../index/index',
            });
          }
          clearTimeout(timer);
        }, 1000);
      })();
    })
    .catch(() => {
      Taro.showModal({
        title: '提示',
        content: '系统异常，请稍后重试',
        showCancel: false,
      });
      Taro.hideLoading();
    });
};

export { request };
