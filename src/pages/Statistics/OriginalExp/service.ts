import request from '@/utils/request';

/** 查询 POST /statistics/original/search */
export async function search(values: any) {
  return request.post('/api/statistics/original/search', {
    ...values,
  });
}

export async function exp({
  fileName,
  param,
  callBack,
}: {
  fileName: string;
  param: any;
  callBack: (status: boolean) => void;
}) {
  let dp = '';
  if (param.deptId) {
    for (let d of param.deptId) {
      dp = dp + '&deptId=' + d;
    }
  }
  return request.download(
    `/api/statistics/original/exp?scaleId=${param.scaleId}&publishId=${
      param.publishId ? param.publishId : ''
    }&startDate=${param.startDate}&endDate=${param.endDate}${dp}`,
    fileName,
    { param },
    callBack,
  );
}
