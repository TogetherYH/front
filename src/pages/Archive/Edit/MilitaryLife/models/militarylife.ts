// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { get, update, add } from '../service';
import { MilitaryLifeType } from '../data';

export interface militaryLifeState {
  militaryLife?: MilitaryLifeType;
}

export interface MilitaryLifeModelType {
  namespace: 'militaryLife';
  state: militaryLifeState;
  reducers: {
    getOne: Reducer<militaryLifeState>;
  };
  effects: {
    fetchOne: Effect;
    fetchUpdate: Effect;
    fetchAdd: Effect;
  };
}

const MilitaryLifeModel: MilitaryLifeModelType = {
  namespace: 'militaryLife',
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
          payload: {
            militaryLife: data.data,
          },
        });
      }
    },
    *fetchUpdate({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(update, { id, values });
      if (data) {
        yield put({
          type: 'fetchOne',
          payload: {
            userId: id,
          },
        });
      }
    },
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        // message.success('Add successfully');
        yield put({
          type: 'fetchOne',
          payload: {},
        });
      }
    },
  },
};

export default MilitaryLifeModel;
