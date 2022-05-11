// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list } from '../service';
import { LogType } from '../data';

export interface logListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: LogType[];
}

export interface LogListModelType {
  namespace: 'logs';
  state: logListState;
  reducers: {
    getList: Reducer<logListState>;
  };
  effects: {
    fetchList: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const LogListModel: LogListModelType = {
  namespace: 'logs',
  state: {
    pageNum: 1,
    pageSize: 20,
  },
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList(
      { payload: { pageNum, pageSize, title, operUser } },
      { put, call },
    ) {
      const data = yield call(list, {
        pageNum,
        pageSize,
        title,
        operUser,
      });
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
        if (location.pathname === '/system/log') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default LogListModel;
