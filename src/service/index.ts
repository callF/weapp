export const api3 =
  __wxConfig.envVersion !== 'release'
    ? 'https://www.xnwlsq.com:43013/mobile-dev'
    : // 'http://192.168.8.88:8244'
      'https://www.xnwlsq.com:43013'; // mobile
export const api4 =
  __wxConfig.envVersion !== 'release'
    ? 'https://www.xnwlsq.com:43013/manage-dev'
    : // 'http://192.168.8.87:8245'
      'https://www.xnwlsq.com:43013'; // manage
