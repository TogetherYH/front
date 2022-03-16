import request from '@/utils/request';

/** 任务分页列表 GET /system/job/list */
export async function list({
  pageNum,
  pageSize,
  name,
}: {
  pageNum: number;
  pageSize: number;
  name: string;
}) {
  return request.get(
    `/api/system/job/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 更新任务信息 POST /system/job/update */
export async function update({ id, values }: { id: string; values: any }) {
  return request.post('/api/system/job/update', {
    id,
    ...values,
  });
}

/** 添加任务信息 POST /system/job/add */
export async function add({ values }: { values: any }) {
  return request.post('/api/system/job/add', {
    ...values,
  });
}

/** 删除任务信息 POST /system/job/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/system/job/delete/${id}`, {});
}
