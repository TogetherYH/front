// import { message } from 'antd';
import { Reducer, Effect } from 'umi';
import { updatePwd } from '@/services/System/service';

export interface pwdState {}

export interface PwdModelType {
  namespace: 'pwd';
  state: pwdState;
  reducers: {};
  effects: {
    fetchUpdate: Effect;
  };
}

const PwdModel: PwdModelType = {
  namespace: 'pwd',
  state: {},
  reducers: {},
  effects: {
    *fetchUpdate({ payload: { oldPwd, newPwd } }, { put, call, select }) {
      const data = yield call(updatePwd, { oldPwd, newPwd });
      // if (data) {
      //   yield put({
      //     type: 'fetchOne',
      //     payload: {},
      //   });
      // }
    },
  },
};

export default PwdModel;
