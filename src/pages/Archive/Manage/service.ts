import request from '@/utils/request';

/** 用户分页列表 GET /system/user/list */
export async function list({
  pageNum,
  pageSize,
  username,
  realName,
}: {
  pageNum: number;
  pageSize: number;
  username: string;
  realName: string;
}) {
  return request.get(
    `/api/archive/list?pageNum=${pageNum}&pageSize=${pageSize}&username=${
      username ? username : ''
    }&realName=${realName ? realName : ''}`,
    {},
  );
}

export async function view({ archiveId }: { archiveId: string }) {
  return request.get(`/api/archive/view/${archiveId}`);
}
