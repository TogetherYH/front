// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list, save } from '../service';
import { CommonType } from '../data';

export interface commonListState {
  list?: CommonType[];
}

export interface CommonListModelType {
  namespace: 'commons';
  state: commonListState;
  reducers: {
    getList: Reducer<commonListState>;
  };
  effects: {
    fetchList: Effect;
    fetchSave: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const CommonListModel: CommonListModelType = {
  namespace: 'commons',
  state: {},
  reducers: {
    getList(state, action) {
      return {
        list: action.payload,
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
    *fetchSave({ payload: { scaleIds } }, { put, call, select }) {
      const data = yield call(save, { scaleIds });
      if (data) {
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
        if (location.pathname === '/publish/common') {
          dispatch({
            type: 'fetchList',
            payload: {},
          });
        }
      });
    },
  },
};

export default CommonListModel;
