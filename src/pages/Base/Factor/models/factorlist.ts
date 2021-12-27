// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list, update, del, add } from '../service';
import { FactorType } from '../data';

export interface factorListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: FactorType[];
}

export interface FactorListModelType {
  namespace: 'factors';
  state: factorListState;
  reducers: {
    getList: Reducer<factorListState>;
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

const FactorListModel: FactorListModelType = {
  namespace: 'factors',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList(
      { payload: { pageNum, pageSize, name, scaleId } },
      { put, call },
    ) {
      const data = yield call(list, {
        pageNum,
        pageSize,
        name,
        scaleId,
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
          return state.factors;
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
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        // message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.factors;
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
    *fetchDelete({ payload: { id } }, { put, call, select }) {
      const data = yield call(del, { id });
      if (data) {
        // message.success('Delete successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.factors;
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
        if (location.pathname === '/base/factor') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default FactorListModel;
