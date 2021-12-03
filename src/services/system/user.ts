import request from '@/utils/request';

/** 获取当前的用户 GET /api/currentUser */
export async function getUserList() {
  return request.get('/api/system/user/list', {});
}
