import request from '@/utils/request';
import { FormValues } from './data';

/** 角色分页列表 GET /system/role/list */
export async function list({
  pageNum,
  pageSize,
  name,
}: {
  pageNum: number;
  pageSize: number;
  name: string;
}) {
  return request.get(
    `/api/system/role/list?pageNum=${pageNum}&pageSize=${pageSize}&name=${
      name ? name : ''
    }`,
    {},
  );
}

/** 更新角色信息 POST /system/role/update */
export async function update({
  id,
  values,
}: {
  id: string;
  values: FormValues;
}) {
  return request.post('/api/system/role/update', {
    id,
    ...values,
  });
}

/** 添加角色信息 POST /system/role/add */
export async function add({ values }: { values: FormValues }) {
  return request.post('/api/system/role/add', {
    ...values,
  });
}

/** 删除角色信息 POST /system/role/delete */
export async function del({ id }: { id: string }) {
  return request.del(`/api/system/role/delete/${id}`, {});
}

/** 更新角色菜单 */
export async function updateRoleMenu({
  roleId,
  menuIds,
}: {
  roleId: string;
  menuIds: string[];
}) {
  return request.post(`/api/system/role/updateRoleMenu`, {
    id: roleId,
    menuIds,
  });
}

/** 根据角色id获取菜单id */
export async function getMenuIdsByRoleId({ roleId }: { roleId: string }) {
  return request.get(
    `/api/system/role/getMenuIdsByRoleId?roleId=${roleId}`,
    {},
  );
}
