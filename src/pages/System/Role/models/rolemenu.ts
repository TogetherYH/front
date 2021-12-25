// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { getMenuIdsByRoleId, updateRoleMenu } from '../service';

export interface roleMenuState {
  roleId?: string;
  menuIds?: string[];
}

export interface RoleMenuModelType {
  namespace: 'roleMenu';
  state: roleMenuState;
  reducers: {
    getList: Reducer<roleMenuState>;
    update: Reducer<roleMenuState>;
  };
  effects: {
    fetchList: Effect;
    fetchUpdate: Effect;
  };
}

const RoleMenuModel: RoleMenuModelType = {
  namespace: 'roleMenu',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
    update(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList({ payload: { roleId } }, { put, call }) {
      const data = yield call(getMenuIdsByRoleId, { roleId });
      if (data) {
        yield put({
          type: 'getList',
          payload: {
            roleId,
            menuIds: data.data,
          },
        });
      }
    },
    *fetchUpdate({ payload: { roleId, menuIds } }, { put, call, select }) {
      const data = yield call(updateRoleMenu, { roleId, menuIds });
      // if (data) {
      //   // message.success('Edit successfully');
      //   yield put({
      //     type: 'getRemote',
      //     payload: {
      //       roleId
      //     },
      //   });
      // }
    },
  },
};

export default RoleMenuModel;
