import request from '@/utils/request';

/** 更新子女信息 POST /archive/child/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/archive/child/update', {
    id,
    ...values,
  });
}

/** 添加子女信息 POST /archive/child/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/archive/child/add', {
    ...values,
  });
}

/** 获取子女信息 POST /archive/child/list */
export async function list({ userId }: { userId: string }) {
  return request.get(`/api/archive/child/list?userId=${userId}`, {});
}

/** 删除子女信息 POST /archive/child/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/archive/child/delete/${id}`, {});
}
