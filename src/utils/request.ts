/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';
import { TOKEN_KEY, getToken } from './token';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
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
};

/**
 * 错误异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  console.log('err handler', error);
  // console.log('resonse', response);
  const { response } = error;
  if (response && response.status) {
    let errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    response
      ?.clone()
      ?.json()
      ?.then((res) => {
        // 后端返回错误信息,就用后端传回的
        errorText = res.msg ? res.msg : errorText;
        notification.error({
          message: `请求错误 ${status}: ${url}`,
          description: errorText,
        });
      });
  } else if (!response) {
    // 如果response为空，返回网络错误
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/** 配置request请求时的默认参数 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 携带token
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  // console.log('fetch', url);
  // 给每个请求带上token
  let headers = {
    'Content-Type': 'application/json;',
    [TOKEN_KEY]: getToken() || '',
  };
  return {
    url,
    options: { ...options, interceptors: true, headers },
  };
});

// response拦截器
request.interceptors.response.use(async (response) => {
  // message.error(codeMaps[response.data.code]);
  const data = await response.clone().json();
  // console.log('response', response);
  if (data.code !== 200) {
    var msg = codeMessage[data.code];
    if (!msg) {
      msg = data.message;
    }
    notification.error({
      description: `错误编码：${data.code}`,
      message: msg,
    });
    return Promise.resolve({ ...data, success: false });
  } else {
    if (data.message) {
      notification.success({
        message: data.message,
      });
    }
    return response;
  }
});

// 封装的get,post.put,delete请求
const get = async (
  url: string,
  parameter?: Record<string, unknown>,
): Promise<any> => {
  // console.log('GET', url, parameter);
  try {
    const res = await request(url, { method: 'get', params: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const del = async (
  url: string,
  parameter?: Record<string, unknown>,
): Promise<any> => {
  try {
    const res = await request(url, { method: 'delete', params: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const post = async (
  url: string,
  parameter?: Record<string, unknown>,
): Promise<any> => {
  // console.log('POST', url, parameter);
  try {
    const res = await request(url, { method: 'post', data: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};
const put = async (
  url: string,
  parameter?: Record<string, unknown>,
): Promise<any> => {
  try {
    const res = await request(url, { method: 'put', data: parameter });
    return res;
  } catch (error) {
    console.error(error);
  }
};

const download = (
  url: string,
  fileName: string,
  params?: {},
  callBack?: (status: boolean) => void,
) => {
  fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json;',
      [TOKEN_KEY]: getToken() || '',
    }),
  })
    .then((response) => {
      console.log('rr', response);
      if (response.status !== 200) {
        notification.error({
          description: `错误编码：${response.status}`,
          message: codeMessage[response.status],
        });
        if (callBack) {
          callBack(false);
        }
        return;
      }
      response.blob().then((blob) => {
        if (callBack) {
          callBack(false);
        }
        const aLink = document.createElement('a');
        // console.log(response);
        if (response && response.status === 500) {
          notification.error({
            description: `错误编码：${response.status}`,
            message: codeMessage[response.status],
          });
        } else {
          document.body.appendChild(aLink);
          aLink.style.display = 'none';
          const objectUrl = URL.createObjectURL(blob);
          aLink.href = objectUrl;
          aLink.download = fileName;
          aLink.click();
          document.body.removeChild(aLink);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default {
  get,
  post,
  put,
  del,
  download,
};
