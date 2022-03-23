// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { get, update, add } from '../service';
import { UserInfoType } from '../data';

export interface userInfoState {
  userInfo?: UserInfoType;
}

export interface UserInfoModelType {
  namespace: 'userInfo';
  state: userInfoState;
  reducers: {
    getOne: Reducer<userInfoState>;
  };
  effects: {
    fetchOne: Effect;
    fetchUpdate: Effect;
    fetchAdd: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserInofModel: UserInfoModelType = {
  namespace: 'userInfo',
  state: {},
  reducers: {
    getOne(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchOne({ payload: { userId } }, { put, call }) {
      const data = yield call(get, {
        userId,
      });
      if (data) {
        console.log('dd', data);
        yield put({
          type: 'getOne',
          payload: {
            userInfo: data.data,
          },
        });
      }
    },
    *fetchUpdate({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(update, { id, values });
      if (data) {
        // message.success('Edit successfully');
        // const { pageNum, pageSize } = yield select((state: any) => {
        //   return state.users;
        // });
        yield put({
          type: 'fetchOne',
          payload: {},
        });
      }
    },
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        // message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.users;
        });
        yield put({
          type: 'fetchOne',
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
        if (location.pathname === '/archive/personal') {
          dispatch({
            type: 'fetchOne',
            payload: {},
          });
        }
      });
    },
  },
};

export default UserInofModel;
