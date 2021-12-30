import request from '@/utils/request';

/** 量表信息 */
export async function scaleInfo({ scaleId }: { scaleId: string }) {
  return request.get(`/api/test/scaleInfo/${scaleId}`, {});
}
