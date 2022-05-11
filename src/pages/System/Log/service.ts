import request from '@/utils/request';

/** 用户日志列表 GET /system/user/list */
export async function list({
  pageNum,
  pageSize,
  title,
  operUser,
}: {
  pageNum: number;
  pageSize: number;
  title: string;
  operUser: string;
}) {
  return request.get(
    `/api/system/log/list?pageNum=${pageNum}&pageSize=${pageSize}&title=${
      title ? title : ''
    }&operUser=${operUser ? operUser : ''}`,
    {},
  );
}
