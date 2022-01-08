import request from '@/utils/request';

/** 测评结果查询 */
export async function list({}) {
  return request.get(`/api/assess/result/list`, {});
}

export async function report({
  id,
  fileName,
}: {
  id: string;
  fileName: string;
}) {
  return request.download(`/api/assess/result/report/${id}`, fileName, {});
}
