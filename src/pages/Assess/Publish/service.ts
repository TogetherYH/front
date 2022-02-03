import request from '@/utils/request';
import { FormValues } from './data';

/** 发布记录分页列表 GET /assess/publish/list */
export async function list({
  pageNum,
  pageSize,
  subject,
}: {
  pageNum: number;
  pageSize: number;
  subject: string;
}) {
  return request.get(
    `/api/assess/publish/list?pageNum=${pageNum}&pageSize=${pageSize}&subject=${
      subject ? subject : ''
    }`,
    {},
  );
}

/** 更新发布信息 POST /assess/publish/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/assess/publish/update', {
    id,
    ...values,
  });
}

/** 添加发布信息 POST /assess/publish/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/assess/publish/add', {
    ...values,
  });
}

/** 获取单个答案信息 POST /assess/publish/ */
export async function get({ publishId }: { publishId: string }) {
  return request.get(`/api/assess/publish/${publishId}`, {});
}
