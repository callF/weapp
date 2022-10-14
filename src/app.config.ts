export default {
  pages: [
    'pages/index/index',
    'pages/authorizeIndex/index',
    'pages/webView/index',
  ],
  subpackages: [
    {
      root: 'pages/packageA',
      pages: ['entry/index'],
    },
  ],
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
  requiredPrivateInfos: ['getLocation'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '智治溪南',
    navigationBarTextStyle: 'black',
  },
  // 分享
  enableShareAppMessage: true,
  enableShareTimeline: true,
};
