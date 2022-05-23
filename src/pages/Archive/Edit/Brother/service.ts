import request from '@/utils/request';

/** 更新兄妹信息 POST /archive/brother/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/archive/brother/update', {
    id,
    ...values,
  });
}

/** 添加兄妹信息 POST /archive/brother/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/archive/brother/add', {
    ...values,
  });
}

/** 获取兄妹信息 POST /archive/brother/ */
export async function get({ userId }: { userId: string }) {
  return request.get(`/api/archive/brother/${userId}`, {});
}
