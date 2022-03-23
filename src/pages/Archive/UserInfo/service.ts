import request from '@/utils/request';

/** 更新用户基本信息 POST /archive/userinfo/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/archive/userinfo/update', {
    id,
    ...values,
  });
}

/** 添加用户基本信息 POST /archive/userinfo/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/archive/userinfo/add', {
    ...values,
  });
}

/** 获取单个用户基本信息 POST /archive/userinfo/ */
export async function get({ userId }: { userId: string }) {
  return request.get(`/api/archive/userinfo/${userId}`, {});
}
