// import { message } from 'antd';
import { Reducer, Effect } from 'umi';
import { get, resetPwd } from '../service';

export interface userState {
  id?: string;
  username?: string;
  realName?: string;
  sex?: string;
  birthday?: string;
  createTime?: string;
  status?: string;
  roleIds?: string[];
  deptId?: string;
}

export interface UserModelType {
  namespace: 'user';
  state: userState;
  reducers: {
    getOne: Reducer<userState>;
  };
  effects: {
    fetchOne: Effect;
    fetchReset: Effect;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
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
        yield put({
          type: 'getOne',
          payload: data.data,
        });
      }
    },
    *fetchReset({ payload: { id } }, { put, call }) {
      const data = yield call(resetPwd, {
        id,
      });
    },
  },
};

export default UserModel;
