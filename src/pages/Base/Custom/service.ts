import request from '@/utils/request';

/** 量表导入模板 */
export async function template() {
  return request.download(
    `/api/base/custom/template`,
    `自定义量表导入模板.xlsx`,
  );
}

/** 导入量表信息 */
export async function imp({ values }: { values: any }) {
  return request.post('/api/base/custom/import', {
    ...values,
  });
}
