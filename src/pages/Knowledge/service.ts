import request from '@/utils/request';

/**  GET /graph/query */
export async function query({ name }: { name: string }) {
  return request.get(`/graph/query`, {});
}
