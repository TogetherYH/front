import request from '@/utils/request';

export async function statics() {
  return request.get(`/api/dv/statics`, {});
}
