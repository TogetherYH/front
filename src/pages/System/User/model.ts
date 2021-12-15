import React from 'react';
import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { getReomteList, editRecord, delRecord, addRecord } from './service';
import { SingleUserType } from './data';

export interface userState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: SingleUserType[];
}

export interface UserModelType {
  namespace: 'users';
  state: userState;
  reducers: {
    getList: Reducer<userState>;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    del: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *getRemote({ payload: { pageNum, pageSize } }, { put, call }) {
      const data = yield call(getReomteList, { pageNum, pageSize });
      if (data) {
        // console.log('ddddddddddddddd', data);
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *edit({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(editRecord, { id, values });
      if (data) {
        message.success('Edit successfully');
        const { pageNum, pageSize } = yield select((state) => {
          return state.users;
        });
        yield put({
          type: 'getRemote',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *add({ payload: { values } }, { put, call, select }) {
      const data = yield call(addRecord, { values });
      if (data) {
        message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state) => {
          return state.users;
        });
        yield put({
          type: 'getRemote',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *del({ payload: { id } }, { put, call, select }) {
      const data = yield call(delRecord, { id });
      // console.log('dddd', data);
      if (data) {
        message.success('Delete successfully');
        const { pageNum, pageSize } = yield select((state) => {
          return state.users;
        });
        // console.log('dddddaaa', pageNum, pageSize);
        yield put({
          type: 'getRemote',
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
        if (location.pathname === '/system/user') {
          dispatch({
            type: 'getRemote',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default UserModel;
