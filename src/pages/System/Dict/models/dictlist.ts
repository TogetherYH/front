import { Reducer, Effect, Subscription } from 'umi';
import { list, add, update } from '../service';
import { DictType } from '../data';

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
    *fetchList({ payload: { pageNum, pageSize, name, code } }, { put, call }) {
      const data = yield call(list, {
        pageNum,
        pageSize,
        name,
        code,
      });
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
        // message.success('Edit successfully');
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
