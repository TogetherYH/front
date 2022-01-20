// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list } from '../service';
import { ResultType } from '../data';

export interface resultListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: ResultType[];
}

export interface ResultListModelType {
  namespace: 'results';
  state: resultListState;
  reducers: {
    getList: Reducer<resultListState>;
  };
  effects: {
    fetchList: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const ResultListModel: ResultListModelType = {
  namespace: 'results',
  state: {},
  reducers: {
    getList(state, { payload }) {
      return {
        ...payload,
      };
    },
  },
  effects: {
    *fetchList({ payload }, { put, call }) {
      const data = yield call(list, {});
      if (data) {
        yield put({
          type: 'getList',
          payload: data.data,
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/assess/result') {
          dispatch({
            type: 'fetchList',
            payload: {},
          });
        }
      });
    },
  },
};

export default ResultListModel;