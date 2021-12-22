import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { page, update, del, add } from '../service';
import { SingleRoleType } from '../data';

export interface roleState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: SingleRoleType[];
}

export interface RoleModelType {
  namespace: 'roles';
  state: roleState;
  reducers: {
    getList: Reducer<roleState>;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    del: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const RoleModel: RoleModelType = {
  namespace: 'roles',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *getRemote({ payload: { pageNum, pageSize, name } }, { put, call }) {
      const data = yield call(page, { pageNum, pageSize, name });
      if (data) {
        yield put({
          type: 'getList',
          payload: data.data,
        });
      }
    },
    *edit({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(update, { id, values });
      if (data) {
        message.success('Edit successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.roles;
        });
        yield put({
          type: 'getRemote',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *add({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.roles;
        });
        yield put({
          type: 'getRemote',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *del({ payload: { id } }, { put, call, select }) {
      const data = yield call(del, { id });
      if (data) {
        message.success('Delete successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.roles;
        });
        yield put({
          type: 'getRemote',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/system/role') {
          dispatch({
            type: 'getRemote',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default RoleModel;
