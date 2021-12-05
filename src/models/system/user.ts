import { Reducer, Effect, Subscription } from 'umi';

import {
  getUserList,
  updateUser,
  deleteUser,
  addUser,
} from '@/services/system/user';

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
    getRemote: Effect;
    updateUser: Effect;
    addUser: Effect;
    deleteUser: Effect;
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
    *getRemote(action, { put, call }) {
      const data = yield call(getUserList);
      yield put({
        type: 'getList',
        payload: data.data.list,
      });
    },
    *updateUser({ type, payload }, { put, call }) {
      console.log('update here', payload);
      yield call(updateUser, payload);
      // const data = yield call(getUserList);
      yield put({
        type: 'getRemote',
      });
    },
    *addUser({ type, payload }, { put, call }) {
      console.log('update here', payload);
      yield call(addUser, payload);
      // const data = yield call(getUserList);
      yield put({
        type: 'getRemote',
      });
    },
    *deleteUser({ type, payload }, { put, call }) {
      console.log('del here', payload);
      yield call(deleteUser, payload);
      yield put({
        type: 'getRemote',
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }, done) {
      return history.listen((location, action) => {
        if (location.pathname === '/system/user') {
          dispatch({
            type: 'getRemote',
            payload: {},
          });
        }
      });
    },
  },
};

export default UserModel;
