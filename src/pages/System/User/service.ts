import request from '@/utils/request';
import { FormValues } from './data';

/** 用户分页列表 GET /system/user/list */
export async function list({
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
    `/api/system/user/list?pageNum=${pageNum}&pageSize=${pageSize}&username=${
      username ? username : ''
    }&realName=${realName ? realName : ''}`,
    {},
  );
}

/** 更新用户信息 POST /system/user/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/user/update', {
    id,
    ...values,
  });
}

/** 添加用户信息 POST /system/user/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/user/add', {
    ...values,
  });
}

/** 删除用户信息 POST /system/user/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/system/user/delete/${id}`, {});
}
