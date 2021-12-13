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
    *getRemote(action, { put, call }) {
      const data = yield call(getReomteList);
      if (data) {
        console.log('ddddddddddddddd', data);
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *edit({ payload: { id, values } }, { put, call }) {
      // console.log('pp', id);
      // console.log('pp', values);
      const data = yield call(editRecord, { id, values });
      // console.log('dddd', data);
      if (data) {
        message.success('Edit successfully');
        yield put({
          type: 'getRemote',
        });
      }
    },
    *add({ payload: { values } }, { put, call }) {
      const data = yield call(addRecord, { values });
      if (data) {
        message.success('Add successfully');
        yield put({
          type: 'getRemote',
        });
      }
    },
    *del({ payload: { id } }, { put, call }) {
      const data = yield call(delRecord, { id });
      // console.log('dddd', data);
      if (data) {
        message.success('Delete successfully');
        yield put({
          type: 'getRemote',
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
            payload: {},
          });
        }
      });
    },
  },
};

export default UserModel;
