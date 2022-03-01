import { Reducer, Effect, Subscription } from 'umi';
import { list, add } from '../service';

interface DictType {
  id: string;
  name: string;
  code: string;
  createTime: string;
  status: string;
}

export interface dictListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: DictType[];
}

export interface DictListModelType {
  namespace: 'dicts';
  state: dictListState;
  reducers: {
    getList: Reducer<dictListState>;
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

const DictListModel: DictListModelType = {
  namespace: 'dicts',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        // message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.dicts;
        });
        yield put({
          type: 'fetchList',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *fetchDelete() {},
    *fetchList({ payload: { pageNum, pageSize } }, { put, call }) {
      const data = yield call(list, {
        pageNum,
        pageSize,
      });
      if (data) {
        yield put({
          type: 'getList',
          payload: data.data,
        });
      }
    },
    *fetchUpdate() {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/system/dict') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default DictListModel;
