import Taro from '@tarojs/taro';
import { urlUtils } from '@szsk/utils';
// import { API_HOST } from '@/constants/api';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
interface RequestParams {
  [key: string]: any;
}
interface RequestOptions {
  method?: string;
  url?: string;
  path?: string;
  credentials?: 'same-origin' | 'include';
  query?: RequestParams;
  data?: RequestParams;
  header?: any;
  dataType?: 'json' | '其他';
  showLoading?: boolean;
  hideErrorMsg?: boolean;
}

interface ICodeMessageType {
  [key: string]: string;
}

const codeMessage: ICodeMessageType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  302: '参数为空',
  303: '参数有误',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  common: '网络异常，请检查后重试',
};

function checkStatus(response: any) {
  // if (response.header && response.header['Set-Cookie']) {
  //   session = response.header['Set-Cookie'];
  // }
  switch (response.statusCode) {
    case 200:
      return response.data;
    case 403: // 一些权限被修改
      return Promise.reject({ message: '无操作权限' });
    default:
      return Promise.reject(response);
  }
}

function checkInnerCode(code: number) {
  switch (code) {
    case 200:
      break;
    case 401:
      break;
    default:
      break;
  }
}

function fetchRequest(options: RequestOptions) {
  const {
    url,
    path,
    data,
    query,
    showLoading,
    header,
    showErrorMsg,
    ...commonOptions
  } = options;
  if (!options.method || methods.indexOf(options.method) === -1) {
    return Promise.reject('请求类型错误');
  }

  const requestUrl = `${url || ''}${path}${urlUtils.genQuery(query)}`;

  const config: any = {
    url: requestUrl,
    header: {
      ...header,
      'blade-auth': Taro.getStorageSync('accessToken'),
      'user-id': Taro.getStorageSync('user-id'),
    },
    ...commonOptions,
  };
  // application/json
  if (header && header['Content-Type'] === 'application/json') {
    config.body = JSON.stringify(data);
  }

  // application/x-www-form-urlencoded
  if (
    header &&
    header['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    const searchParams =
      data &&
      Object.keys(data)
        .map((key) => {
          return (
            data &&
            `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
          );
        })
        .join('&');
    config.body = searchParams;
  }

  // Taro
  if (config.body) {
    config.data = config.body;
    // 防止过久
    config.timeout = 60000;
    delete config.body;
  }

  if (showLoading) {
    Taro.showLoading({ title: '加载中', mask: true });
  }

  return Taro.request(config)
    .then((response) => checkStatus(response))
    .catch((response) => Promise.reject(response));
}

/**
 * 封装promise返回的err与data
 * @param { Promise } promise
 * @return { Promise }
 */
function to(promise, hideErrorMsg?: boolean) {
  return promise
    .then(function (data) {
      Taro.hideLoading();
      checkInnerCode(data.code);
      if (data.code !== 200) {
        return Promise.reject(data);
      }
      return [null, data];
    })
    .catch(function (err) {
      let msg = '';
      if (typeof err === 'object') {
        msg = err.message || codeMessage[err.code || 'common'];
      } else {
        msg = codeMessage.common;
      }
      if (!hideErrorMsg && err?.code !== 1010) {
        // Taro.showToast({
        //   title: msg,
        //   icon: 'none',
        //   duration: 3000,
        // });
      }
      return [err, undefined];
    });
}

const request = {
  get: (opts: RequestOptions) => {
    return to(
      fetchRequest({
        showLoading: true,
        ...opts,
        method: 'GET',
        header: { Accept: 'application/json' },
      }),
      opts.hideErrorMsg,
    );
  },
  post: (opts: RequestOptions) => {
    return to(
      fetchRequest({
        showLoading: true,
        ...opts,
        method: 'POST',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      opts.hideErrorMsg,
    );
  },
  postForm: (opts: RequestOptions) => {
    return to(
      fetchRequest({
        showLoading: true,
        ...opts,
        method: 'POST',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );
  },
  delete: (opts: RequestOptions) => {
    return to(
      fetchRequest({
        showLoading: true,
        ...opts,
        method: 'DELETE',
        header: { Accept: 'application/json' },
      }),
    );
  },
  put: (opts: RequestOptions) => {
    return to(
      fetchRequest({
        showLoading: true,
        ...opts,
        method: 'PUT',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    );
  },
  patch: (opts: RequestOptions) => {
    return to(
      fetchRequest({
        showLoading: true,
        ...opts,
        method: 'PATCH',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    );
  },
  upload: (opts: RequestOptions) => {
    return to(
      fetchRequest({
        showLoading: true,
        ...opts,
        method: 'POST',
        header: {
          Accept: 'application/json',
        },
      }),
    );
  },
};

export default request;
