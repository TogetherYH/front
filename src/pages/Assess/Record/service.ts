import request from '@/utils/request';

/** 测评记录查询 */
export async function list({
  scaleName,
  pageNum,
  pageSize,
}: {
  scaleName: string;
  status: string;
  pageNum: number;
  pageSize: number;
}) {
  return request.get(
    `/api/assess/record/list?pageNum=${pageNum}&pageSize=${pageSize}&scaleName=${
      scaleName ? scaleName : ''
    }`,
    {},
  );
}

/** 更新Temp信息 删除原有信息  POST assess/record/update */
export async function update({ id }: { id: string }) {
  return request.post(`/api/assess/record/update?id=${id}`);
}
