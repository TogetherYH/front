// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list, add, del } from '../service';
// import { UserType } from '../data';

export interface dsListState {
  // pageNum?: number;
  // pageSize?: number;
  // total?: number;
  list?: any[];
}

export interface DSListModelType {
  namespace: 'dslist';
  state: dsListState;
  reducers: {
    getList: Reducer<dsListState>;
  };
  effects: {
    fetchList: Effect;
    // fetchUpdate: Effect;
    fetchDelete: Effect;
    fetchAdd: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const DSListModel: DSListModelType = {
  namespace: 'dslist',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList({ payload: {} }, { put, call }) {
      const data = yield call(list, {});
      if (data) {
        yield put({
          type: 'getList',
          payload: { list: data.data },
        });
      }
    },
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        // message.success('Add successfully');
        // const { } = yield select((state: any) => {
        //   return state.users;
        // });
        yield put({
          type: 'fetchList',
          payload: {},
        });
      }
    },
    *fetchDelete({ payload: { name } }, { put, call, select }) {
      const data = yield call(del, { name });
      if (data) {
        // message.success('Delete successfully');
        // const { pageNum, pageSize } = yield select((state: any) => {
        //   return state.users;
        // });
        yield put({
          type: 'fetchList',
          payload: {},
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/system/ds') {
          dispatch({
            type: 'fetchList',
            payload: {},
          });
        }
      });
    },
  },
};

export default DSListModel;
