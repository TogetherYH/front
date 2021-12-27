import request from '@/utils/request';
import { FormValues } from './data';

/** 因子分页列表 GET /base/question/list */
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
    `/api/base/question/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }&scaleId=${scaleId ? scaleId : ''}`,
    {},
  );
}

/** 更新因子信息 POST /base/question/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/base/question/update', {
    id,
    ...values,
  });
}

/** 添加因子信息 POST /base/question/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/base/question/add', {
    ...values,
  });
}

/** 删除因子信息 POST /base/question/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/base/question/delete/${id}`, {});
}

/** 获取单个因子信息 POST /base/question/ */
export async function get({ questionId }: { questionId: string }) {
  return request.get(`/api/base/question/${questionId}`, {});
}
