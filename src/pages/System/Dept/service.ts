import request from 'umi-request';
import { FormValues } from './data';

/** 部门分页列表 GET /sysstem/user/list */
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
    `/api/system/dept/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 更新部门信息 POST /sysstem/dept/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/dept/update', {
    data: { id, ...values },
  });
}

/** 添加部门信息 POST /sysstem/dept/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/dept/add', {
    data: values,
  });
}

/** 删除部门信息 POST /sysstem/dept/delete */
export async function del({ id }: { id: string }) {
  return request.delete(`/api/system/dept/delete/${id}`, {});
}
