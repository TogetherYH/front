import request from '@/utils/request';

/**  GET /graph/query */
export async function query({
  label,
  keyword,
}: {
  label: string;
  keyword: string;
}) {
  return request.get(
    `/graph/query?label=${label ? label : ''}&keyword=${
      keyword ? keyword : ''
    }`,
    {},
  );
}
