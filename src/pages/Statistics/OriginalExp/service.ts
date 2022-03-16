import request from '@/utils/request';

/** 查询 POST /statistics/original/search */
export async function search(values: any) {
  console.log('bb', values);
  return request.post('/api/statistics/original/search', {
    ...values,
  });
}
