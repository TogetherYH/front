import request from 'umi-request';
import { FormValues } from './data';

/** 角色分页列表 GET /sysstem/role/list */
export async function page({
  pageNum,
  pageSize,
  name,
}: {
  pageNum: number;
  pageSize: number;
  name: string;
}) {
  return request.get(
    `/api/system/role/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 更新角色信息 POST /sysstem/role/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/role/update', {
    data: { id, ...values },
  });
}

/** 添加角色信息 POST /sysstem/role/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/role/add', {
    data: values,
  });
}

/** 删除角色信息 POST /sysstem/role/delete */
export async function del({ id }: { id: string }) {
  return request.delete(`/api/system/role/delete/${id}`, {});
}
