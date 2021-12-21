import request from '@/utils/request';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return request.get('/api/currentUser', {});
}

/** 登录接口 POST /api/login/account */
export async function login(param: API.LoginParams): Promise<API.LoginResult> {
  return request.post('/api/login', param);
}
