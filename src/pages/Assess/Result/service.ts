import request from '@/utils/request';

/** 测评结果查询 */
export async function list({
  scaleName,
  warningLevel,
  username,
  deptId,
  publishId,
  startDate,
  endDate,
  pageNum,
  pageSize,
}: {
  scaleName: string;
  warningLevel: string[];
  username: string;
  deptId: string;
  publishId: string;
  startDate: string;
  endDate: string;
  pageNum: number;
  pageSize: number;
}) {
  return request.get(
    `/api/assess/result/list?pageNum=${pageNum}&pageSize=${pageSize}&scaleName=${
      scaleName ? scaleName : ''
    }&warningLevel=${warningLevel ? warningLevel : ''}&username=${
      username ? username : ''
    }&deptId=${deptId ? deptId : ''}&publishId=${publishId ? publishId : ''}${
      startDate ? '&startTime=' + startDate + ' 00:00:00' : ''
    }${endDate ? '&endTime=' + endDate + ' 23:59:59' : ''}`,
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
  username,
  deptId,
  publishId,
  startDate,
  endDate,
  callBack,
}: {
  fileName: string;
  scaleName: string;
  warningLevel: string[];
  username: string;
  deptId: string;
  publishId: string;
  startDate: string;
  endDate: string;
  callBack: (status: boolean) => void;
}) {
  return request.download(
    `/api/assess/result/zip?scaleName=${
      scaleName ? scaleName : ''
    }&warningLevel=${warningLevel ? warningLevel : ''}&username=${
      username ? username : ''
    }&deptId=${deptId ? deptId : ''}&publishId=${publishId ? publishId : ''}${
      startDate ? '&startTime=' + startDate + ' 00:00:00' : ''
    }${endDate ? '&endTime=' + endDate + ' 23:59:59' : ''}&${Math.random()}`,
    fileName,
    {},
    callBack,
  );
}

export async function progress() {
  return request.get(`/api/assess/result/progress`, {});
}
