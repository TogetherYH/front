import { Reducer, Effect, Subscription } from 'umi';
import { list, update } from '../service';
import { RecordType } from '../data';

export interface recordListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: RecordType[];
}

export interface RecordListModelType {
  namespace: 'records';
  state: recordListState;
  reducers: {
    getList: Reducer<recordListState>;
  };
  effects: {
    fetchList: Effect;
    fetchCalculator: Effect;
    // fetchdeleteRecord: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const RecordListModel: RecordListModelType = {
  namespace: 'records',
  state: {},
  reducers: {
    getList(state, { payload }) {
      return {
        ...payload,
      };
    },
  },
  effects: {
    *fetchList({ payload: { scaleName, pageNum, pageSize } }, { put, call }) {
      const data = yield call(list, {
        scaleName,
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
    *fetchCalculator({ payload: { id } }, { put, call, select }) {
      const data = yield call(update, { id });
      if (data) {
        // message.success('Edit successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.records;
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
        if (location.pathname === '/assess/record') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default RecordListModel;
