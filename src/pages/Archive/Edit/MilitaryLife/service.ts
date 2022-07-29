import request from '@/utils/request';

/** 更新军旅生活 POST /archive/military/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/archive/military/update', {
    id,
    ...values,
  });
}

/** 添加军旅生活 POST /archive/military/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/archive/military/add', {
    ...values,
  });
}

/** 获取军旅生活 POST /archive/military/ */
export async function get({ userId }: { userId: string }) {
  return request.get(`/api/archive/military/${userId}`, {});
}
