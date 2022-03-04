import request from '@/utils/request';
import { FormValues } from './data';

/** 字典分页列表 GET /system/dict/list */
export async function list({
  pageNum,
  pageSize,
  name,
  code,
}: {
  pageNum: number;
  pageSize: number;
  name: string;
  code: string;
}) {
  return request.get(
    `/api/system/dict/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }&code=${code ? code : ''}`,
    {},
  );
}

/** 添加字典信息 POST /system/dict/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/dict/add', {
    ...values,
  });
}

/** 更新字典信息 POST /system/dict/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/dict/update', {
    id,
    ...values,
  });
}

/** 字典项列表 GET /system/dict/items */
export async function items({ dictCode }: { dictCode: string }) {
  return request.get(`/api/system/dict/items?dictCode=${dictCode}`, {});
}

/** 添加字典项信息 POST /system/dict/addItem */
export async function addItem({ values }: { values: FormValues }) {
  return request.post('/api/system/dict/addItem', {
    ...values,
  });
}

/** 更新字典信息 POST /system/dict/updateItem */
export async function updateItem({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/dict/updateItem', {
    id,
    ...values,
  });
}
