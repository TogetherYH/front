import request from '@/utils/request';
import { FormValues } from './data';

/** 答案分页列表 GET /base/answer/list */
export async function list({
  pageNum,
  pageSize,
  name,
  scaleId,
}: {
  pageNum: number;
  pageSize: number;
  name: string;
  scaleId: string;
}) {
  return request.get(
    `/api/base/answer/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }&scaleId=${scaleId ? scaleId : ''}`,
    {},
  );
}

/** 更新答案信息 POST /base/answer/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/base/answer/update', {
    id,
    ...values,
  });
}

/** 添加答案信息 POST /base/answer/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/base/answer/add', {
    ...values,
  });
}

/** 删除答案信息 POST /base/answer/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/base/answer/delete/${id}`, {});
}

/** 获取单个答案信息 POST /base/answer/ */
export async function get({ answerId }: { answerId: string }) {
  return request.get(`/api/base/answer/${answerId}`, {});
}
