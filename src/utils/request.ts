import { extend } from 'umi-request';
import type { RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';

// codeMessage仅供参考 具体根据和后端协商,在详细定义.
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  401: '用户没有权限。',
  403: '访问被禁止。',
  404: '请求地址不存在。',
  500: '服务器发生错误，请联系管理员。',
};

/**
 * 错误异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  console.log('err handler', error);
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

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
});

// request拦截器, 携带token
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  // 给每个请求带上token
  let token = localStorage.getItem('token') || '';
  let headers = {
    'Content-Type': 'application/json;',
    'sz-token': token,
  };
  return {
    url,
    options: { ...options, interceptors: true, headers },
  };
});

/**
 * @url 请求的url
 * @parameter 上传的参数
 */

// 封装的get,post.put,delete请求
const get = async (
  url: string,
  parameter?: Record<string, unknown>,
): Promise<any> => {
  console.log('GET', url, parameter);
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
  console.log('POST', url, parameter);
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

export default {
  get,
  post,
  put,
  del,
};
