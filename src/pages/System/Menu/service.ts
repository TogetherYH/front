import request from 'umi-request';
import { FormValues } from './data';

/** 菜单分页列表 GET /sysstem/menu/list */
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
    `/api/system/menu/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 菜单树 GET /sysstem/menu/tree */
export async function tree() {
  return request.get(`/api/system/menu/tree`, {});
}

/** 更新菜单信息 POST /sysstem/menu/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/menu/update', {
    data: { id, ...values },
  });
}

/** 添加菜单信息 POST /sysstem/menu/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/menu/add', {
    data: values,
  });
}

/** 删除菜单信息 POST /sysstem/menu/delete */
export async function del({ id }: { id: string }) {
  return request.delete(`/api/system/menu/delete/${id}`, {});
}
