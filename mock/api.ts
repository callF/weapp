const delay = require('mocker-api/lib/delay');
const pointMallApi = require('./pointMall.ts');

const proxy = {
  ...pointMallApi,
};

module.exports = delay(proxy, 1000);
