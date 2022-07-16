// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { countResultByMonth } from '../services';

export interface resultByMonthState {
  data: [];
}

export interface ResultByMonthModelType {
  namespace: 'resultByMonth';
  state: resultByMonthState;
  reducers: {
    getData: Reducer<resultByMonthState>;
  };
  effects: {
    fetchData: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const ResultByMonthModel: ResultByMonthModelType = {
  namespace: 'resultByMonth',
  state: {
    data: [],
  },
  reducers: {
    getData(state, action) {
      return {
        data: action.payload,
      };
    },
  },
  effects: {
    *fetchData({}, { put, call }) {
      const data = yield call(countResultByMonth);
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

export default ResultByMonthModel;
