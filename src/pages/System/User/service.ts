import { message } from 'antd';
import request, { extend } from 'umi-request';
import { FormValues } from './data';

const errorHandler = function (error: any) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('.....');
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    // console.log(codeMap[error.data.status]);
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    // 如果response为空，返回网络错误
    message.error('Network Error');
  }

  throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

// 1. Unified processing
const extendRequest = extend({ errorHandler });

export const getReomteList = async () => {
  return extendRequest('http://localhost:8080/system/user/list', {
    method: 'get',
  })
    .then(function (response) {
      console.log('responserrrrrrrr', request);
      return response.data;
    })
    .catch(function (error) {
      // console.log(error);
      return false;
    });
};

export const editRecord = async ({
  id,
  values,
}: {
  id: number;
  values: FormValues;
}) => {
  return extendRequest('http://localhost:8080/system/user/update', {
    method: 'post',
    data: { id, ...values },
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

export const addRecord = async ({ values }: { values: FormValues }) => {
  return extendRequest('http://localhost:8080/system/user/add', {
    method: 'post',
    data: values,
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

export const delRecord = async ({ id }: { id: number }) => {
  return extendRequest(`http://localhost:8080/system/user/delete/${id}`, {
    method: 'delete',
  })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};
