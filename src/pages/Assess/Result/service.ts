import request from '@/utils/request';

/** 测评结果查询 */
export async function list({
  pageNum,
  pageSize,
}: {
  pageNum: number;
  pageSize: number;
}) {
  return request.get(
    `/api/assess/result/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    {},
  );
}

export async function view({ resultId }: { resultId: string }) {
  return request.get(`/api/assess/result/view/${resultId}`);
}

export async function report({
  id,
  fileName,
  callBack,
}: {
  id: string;
  fileName: string;
  callBack: (status: boolean) => void;
}) {
  return request.download(
    `/api/assess/result/report/${id}`,
    fileName,
    {},
    callBack,
  );
}

export async function zip({
  fileName,
  callBack,
}: {
  fileName: string;
  callBack: (status: boolean) => void;
}) {
  return request.download(
    `/api/assess/result/zip?${Math.random()}`,
    fileName,
    {},
    callBack,
  );
}
