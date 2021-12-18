import request from 'umi-request';
import { FormValues } from './data';

/** 用户分页列表 GET /sysstem/user/list */
export async function page({
  pageNum,
  pageSize,
  username,
  realName,
}: {
  pageNum: number;
  pageSize: number;
  username: string;
  realName: string;
}) {
  return request.get(
    `http://localhost:8080/system/user/list?pageNum=${pageNum}&pageSize=${pageSize}&username=${
      username ? username : ''
    }&realName=${realName ? realName : ''}`,
    {},
  );
}

/** 更新用户信息 POST /sysstem/user/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('http://localhost:8080/system/user/update', {
    data: { id, ...values },
  });
}

/** 添加用户信息 POST /sysstem/user/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('http://localhost:8080/system/user/add', {
    data: values,
  });
}

/** 删除用户信息 POST /sysstem/user/delete */
export async function del({ id }: { id: string }) {
  return request.delete(`http://localhost:8080/system/user/delete/${id}`, {});
}
