import request from '@/utils/request';
import { FormValues } from './data';

/** 菜单分页列表 GET /system/menu/list */
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
    `/api/system/menu/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 菜单树 GET /system/menu/tree */
export async function tree() {
  return request.get(`/api/system/menu/tree`, {});
}

/** 更新菜单信息 POST /system/menu/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/menu/update', {
    id,
    ...values,
  });
}

/** 添加菜单信息 POST /system/menu/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/menu/add', {
    ...values,
  });
}

/** 删除菜单信息 POST /system/menu/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/system/menu/delete/${id}`, {});
}
