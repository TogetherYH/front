import request from '@/utils/request';
import { FormValues } from './data';

/** 部门分页列表 GET /system/dept/list */
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
    `/api/system/dept/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 部门树 GET /system/dept/tree */
export async function tree() {
  return request.get(`/api/system/dept/tree`, {});
}

/** 更新部门信息 POST /system/dept/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/dept/update', {
    id,
    ...values,
  });
}

/** 添加部门信息 POST /system/dept/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/dept/add', {
    ...values,
  });
}

/** 删除部门信息 POST /system/dept/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/system/dept/delete/${id}`, {});
}
