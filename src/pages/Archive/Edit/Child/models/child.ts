import { Reducer, Effect, Subscription } from 'umi';
import { list, update, add, del } from '../service';
import { ChildType } from '../data';

export interface childrenState {
  children?: ChildType[];
}

export interface ChildrenModelType {
  namespace: 'children';
  state: childrenState;
  reducers: {
    getList: Reducer<childrenState>;
  };
  effects: {
    fetchList: Effect;
    fetchUpdate: Effect;
    fetchAdd: Effect;
    fetchDel: Effect;
  };
  // subscriptions: {
  //   setup: Subscription;
  // };
}

const ChildrenModel: ChildrenModelType = {
  namespace: 'children',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList({ payload: { userId } }, { put, call }) {
      const data = yield call(list, {
        userId: userId ? userId : '',
      });
      if (data) {
        yield put({
          type: 'getList',
          payload: {
            children: data.data,
          },
        });
      }
    },
    *fetchUpdate({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(update, { id, values });
      if (data) {
        yield put({
          type: 'fetchList',
          payload: {
            userId: values.userId,
          },
        });
      }
    },
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        yield put({
          type: 'fetchList',
          payload: {
            userId: values.userId,
          },
        });
      }
    },
    *fetchDel({ payload: { id, userId } }, { put, call, select }) {
      const data = yield call(del, { id });
      if (data) {
        yield put({
          type: 'fetchList',
          payload: {
            userId,
          },
        });
      }
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen((location, action) => {
  //       if (location.pathname === '/archive/edit') {
  //         dispatch({
  //           type: 'fetchList',
  //           payload: {},
  //         });
  //       }
  //     });
  //   },
  // },
};

export default ChildrenModel;
