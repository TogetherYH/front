import request from '@/utils/request';

/**  GET /graph/query */
export async function query({
  label,
  keyword,
  relationship,
}: {
  label: string;
  keyword: string;
  relationship: string;
}) {
  return request.get(
    `/graph/query?label=${label ? label : ''}&keyword=${
      keyword ? keyword : ''
    }&relationship=${relationship ? relationship : ''}`,
    {},
  );
}
