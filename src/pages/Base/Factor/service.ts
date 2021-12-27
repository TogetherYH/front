import request from '@/utils/request';
import { FormValues } from './data';

/** 因子分页列表 GET /base/factor/list */
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
    `/api/base/factor/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }&scaleId=${scaleId ? scaleId : ''}`,
    {},
  );
}

/** 更新因子信息 POST /base/factor/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/base/factor/update', {
    id,
    ...values,
  });
}

/** 添加因子信息 POST /base/factor/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/base/factor/add', {
    ...values,
  });
}

/** 删除因子信息 POST /base/factor/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/base/factor/delete/${id}`, {});
}

/** 获取单个因子信息 POST /base/factor/ */
export async function get({ factorId }: { factorId: string }) {
  return request.get(`/api/base/factor/${factorId}`, {});
}
