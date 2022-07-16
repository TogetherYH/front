// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { countWarningByMonth } from '../services';

export interface warningByMonthState {
  data: [];
}

export interface WarningByMonthModelType {
  namespace: 'warningByMonth';
  state: warningByMonthState;
  reducers: {
    getData: Reducer<warningByMonthState>;
  };
  effects: {
    fetchData: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const WarningByMonthModel: WarningByMonthModelType = {
  namespace: 'warningByMonth',
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
      const data = yield call(countWarningByMonth);
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

export default WarningByMonthModel;
