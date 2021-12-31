import request from '@/utils/request';

/** 量表信息 */
export async function scaleInfo({ scaleId }: { scaleId: string }) {
  return request.get(`/api/assess/scaleInfo/${scaleId}`, {});
}

/** 新增测评记录 */
export async function addResult({
  userId,
  scaleId,
  publishId,
}: {
  userId: string;
  scaleId: string;
  publishId: string;
}) {
  return request.post(`/api/assess/result/add`, {
    userId,
    publishId,
    scaleId,
  });
}

/** 提交测评记录 */
export async function submitResult({
  id,
  userId,
  scaleId,
  publishId,
  result,
}: {
  id: string;
  userId: string;
  scaleId: string;
  publishId: string;
  result: string;
}) {
  return request.post(`/api/assess/result/submit`, {
    id,
    userId,
    publishId,
    scaleId,
    result,
  });
}
