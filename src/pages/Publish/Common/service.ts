import request from '@/utils/request';
import { FormValues } from './data';

/** 常用量表 GET /publish/common/list */
export async function list({}) {
  return request.get(`/api/publish/common/list`, {});
}

/** 保存常用量表 POST /publish/common/save */
export async function save({ scaleIds }: { scaleIds: string[] }) {
  // console.log('ss2', scaleIds)
  return request.post('/api/publish/common/save', {
    scaleIds,
  });
}
