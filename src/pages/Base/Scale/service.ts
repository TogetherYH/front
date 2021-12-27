import request from '@/utils/request';
import { FormValues } from './data';

/** 量表分页列表 GET /base/scale/list */
export async function list({
  pageNum,
  pageSize,
  name,
}: {
  pageNum: number;
  pageSize: number;
  name: string;
}) {
  return request.get(
    `/api/base/scale/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 量表树 GET /base/scale/tree */
export async function tree() {
  return request.get(`/api/base/scale/tree`, {});
}

/** 更新量表信息 POST /base/scale/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/base/scale/update', {
    id,
    ...values,
  });
}

/** 添加量表信息 POST /base/scale/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/base/scale/add', {
    ...values,
  });
}

/** 删除量表信息 POST /base/scale/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/base/scale/delete/${id}`, {});
}

/** 获取单个量表信息 POST /base/scale/ */
export async function get({ scaleId }: { scaleId: string }) {
  return request.get(`/api/base/scale/${scaleId}`, {});
}
