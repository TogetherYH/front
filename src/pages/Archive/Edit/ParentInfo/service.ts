import request from '@/utils/request';

/** 更新父母基本信息 POST /archive/parentinfo/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/archive/parentinfo/update', {
    id,
    ...values,
  });
}

/** 添加父母基本信息 POST /archive/parentinfo/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/archive/parentinfo/add', {
    ...values,
  });
}

/** 获取单个父母基本信息记录 POST /archive/parentinfo/ */
export async function get({ userId }: { userId: string }) {
  return request.get(`/api/archive/parentinfo/${userId}`, {});
}
