import request from '@/utils/request';
// import { FormValues } from './data';

/** 数据源列表 GET /system/ds/list */
export async function list() {
  return request.get(`/api/system/ds/list`, {});
}

/** 添加数据源 POST /system/ds/addDlyyOracle */
export async function add() {
  return request.post('/api/system/ds/addDlyyOracle', {});
}

/** 删除数据源信息 POST /system/ds/del */
export async function del({ name }: { name: string }) {
  return request.del(`/api/system/ds/remove/${name}`, {});
}
