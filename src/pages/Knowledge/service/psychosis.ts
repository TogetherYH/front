import request from '@/utils/request';
import { FormValues } from './data';

/** psychosis列表 GET /graph/psychosis/list */
export async function list({ name }: { name: string }) {
  return request.get(`/graph/psychosis/list?name=${name}`, {});
}
