// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list, update, add, del } from '../service';
import { PublishType } from '../data';

export interface publishListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: PublishType[];
}

export interface PublishListModelType {
  namespace: 'publishs';
  state: publishListState;
  reducers: {
    getList: Reducer<publishListState>;
  };
  effects: {
    fetchList: Effect;
    fetchUpdate: Effect;
    fetchAdd: Effect;
    fetchDelete: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const PublishListModel: PublishListModelType = {
  namespace: 'publishs',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList({ payload: { pageNum, pageSize, subject } }, { put, call }) {
      const data = yield call(list, {
        pageNum,
        pageSize,
        subject,
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
          return state.publishs;
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
          return state.publishs;
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
          return state.publishs;
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
        if (location.pathname === '/assess/publish') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default PublishListModel;
