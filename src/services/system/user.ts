import request from '@/utils/request';

/** 用户列表 */
export async function getUserList() {
  return request.get('/api/system/user/list', {});
}

/** 更新用户信息 */
export async function updateUser(param) {
  return request.post('/api/system/user/update', param);
}

/** 更新用户信息 */
export async function addUser(param) {
  return request.post('/api/system/user/add', param);
}

export async function deleteUser({ id }) {
  return request.del('/api/system/user/delete/' + id);
}
