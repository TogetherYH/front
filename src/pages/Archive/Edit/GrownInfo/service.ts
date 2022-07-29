import request from '@/utils/request';

/** 更新成长史信息 POST /archive/grown/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/archive/grown/update', {
    id,
    ...values,
  });
}

/** 添加成长史信息 POST /archive/grown/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/archive/grown/add', {
    ...values,
  });
}

/** 获取成长史信息记录 POST /archive/grown/ */
export async function get({ userId }: { userId: string }) {
  return request.get(`/api/archive/grown/${userId}`, {});
}
