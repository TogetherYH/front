import request from '@/utils/request';

export async function statics() {
  return request.get(`/api/dv/statics`, {});
}

export async function countResultByMonth() {
  return request.get(`/api/dv/countResultByMonth`, {});
}
