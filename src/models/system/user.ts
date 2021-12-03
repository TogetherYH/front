import { Reducer, Effect, Subscription } from 'umi';

import { getUserList } from '@/services/system/user';

export interface UserModelState {
  id: number;
  username: string;
  // age: number;
  // address: string;
  // tags: string[];
}

export interface UserModelType {
  namespace: 'users';
  state: UserModelState[];
  reducers: {
    getList: Reducer;
  };
  effects: {
    getUserList: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  // 初始值
  state: [],
  reducers: {
    getList(state, { type, payload }) {
      return payload;
    },
  },
  effects: {
    *getUserList(action, { put, call }) {
      const data = yield call(getUserList);
      console.log('ddd', data);
      yield put({
        type: 'getList',
        payload: data.data.list,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }, done) {
      return history.listen((location, action) => {
        if (location.pathname === '/system/user') {
          dispatch({
            type: 'getUserList',
            payload: {},
          });
        }
      });
    },
  },
};

export default UserModel;
