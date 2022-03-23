import request from '@/utils/request';

/** 更新抚养史 POST /archive/raising/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/archive/raising/update', {
    id,
    ...values,
  });
}

/** 添加抚养史 POST /archive/raising/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/archive/raising/add', {
    ...values,
  });
}

/** 获取抚养史 POST /archive/raising/list */
export async function list({ userId }: { userId: string }) {
  return request.get(`/api/archive/raising/list?userId=${userId}`, {});
}

/** 删除抚养史 POST /archive/raising/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/archive/raising/delete/${id}`, {});
}
