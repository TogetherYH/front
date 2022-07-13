// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { statics } from '../services';

export interface staticsState {
  countUser: string;
  countResult: string;
  countWarning: string;
  countWarningMiddleAbove: string;
}

export interface StaticsModelType {
  namespace: 'statics';
  state: staticsState;
  reducers: {
    getData: Reducer<staticsState>;
  };
  effects: {
    fetchData: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const StaticsModel: StaticsModelType = {
  namespace: 'statics',
  state: {
    countUser: '0',
    countResult: '0',
    countWarning: '0',
    countWarningMiddleAbove: '0',
  },
  reducers: {
    getData(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchData({}, { put, call }) {
      const data = yield call(statics);
      if (data) {
        yield put({
          type: 'getData',
          payload: data.data,
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/dv') {
          dispatch({
            type: 'fetchData',
            payload: {},
          });
        }
      });
    },
  },
};

export default StaticsModel;
