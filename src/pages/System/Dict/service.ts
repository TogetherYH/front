import request from '@/utils/request';
import { FormValues } from './data';

/** 字典分页列表 GET /system/dict/list */
export async function list({
  pageNum,
  pageSize,
}: {
  pageNum: number;
  pageSize: number;
}) {
  return request.get(
    `/api/system/dict/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    {},
  );
}

/** 添加字典信息 POST /system/dict/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/dict/add', {
    ...values,
  });
}
