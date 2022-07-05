import request from '@/utils/request';

/** 更新密码 POST /updatePwd */
export async function updatePwd({
  oldPwd,
  newPwd,
}: {
  oldPwd: string;
  newPwd: string;
}) {
  return request.put('/api/updatePwd', {
    newPwd,
    oldPwd,
  });
}
