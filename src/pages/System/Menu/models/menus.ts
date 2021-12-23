import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list, update, del, add } from '../service';
import { MenuType } from '../data';

export interface menuState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: MenuType[];
}

export interface MenuModelType {
  namespace: 'menus';
  state: menuState;
  reducers: {
    getList: Reducer<menuState>;
  };
  effects: {
    fetchList: Effect;
    fetchUpdate: Effect;
    fetchDelete: Effect;
    fetchAdd: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menus',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList({ payload: { pageNum, pageSize, name } }, { put, call }) {
      const data = yield call(list, { pageNum, pageSize, name });
      if (data) {
        yield put({
          type: 'getList',
          payload: data.data,
        });
      }
    },
    *fetchUpdate({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(update, { id, values });
      if (data) {
        message.success('Edit successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.menus;
        });
        yield put({ type: 'menuTree/fetchTree' });
        yield put({
          type: 'fetchList',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.menus;
        });
        yield put({ type: 'menuTree/fetchTree' });
        yield put({
          type: 'fetchList',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *fetchDelete({ payload: { id } }, { put, call, select }) {
      const data = yield call(del, { id });
      if (data) {
        message.success('Delete successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.menus;
        });
        yield put({ type: 'menuTree/fetchTree' });
        yield put({
          type: 'fetchList',
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
        if (location.pathname === '/system/menu') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default MenuModel;
