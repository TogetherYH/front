import request from '@/utils/request';

/** 测评结果查询 */
export async function list({
  scaleName,
  warningLevel,
  pageNum,
  pageSize,
}: {
  scaleName: string;
  warningLevel: string[];
  pageNum: number;
  pageSize: number;
}) {
  return request.get(
    `/api/assess/result/list?pageNum=${pageNum}&pageSize=${pageSize}&scaleName=${
      scaleName ? scaleName : ''
    }&warningLevel=${warningLevel ? warningLevel : ''}`,
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
  scaleName,
  warningLevel,
  callBack,
}: {
  fileName: string;
  scaleName: string;
  warningLevel: string[];
  callBack: (status: boolean) => void;
}) {
  return request.download(
    `/api/assess/result/zip?scaleName=${
      scaleName ? scaleName : ''
    }&warningLevel=${warningLevel ? warningLevel : ''}&${Math.random()}`,
    fileName,
    {},
    callBack,
  );
}
