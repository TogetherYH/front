// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { get, update, add } from '../service';
import { GrownInfoType } from '../data';

export interface grownInfoState {
  grownInfo?: GrownInfoType;
}

export interface GrownInfoModelType {
  namespace: 'grownInfo';
  state: grownInfoState;
  reducers: {
    getOne: Reducer<grownInfoState>;
  };
  effects: {
    fetchOne: Effect;
    fetchUpdate: Effect;
    fetchAdd: Effect;
  };
}

const GrownInfoModel: GrownInfoModelType = {
  namespace: 'grownInfo',
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
        // const {
        //   id,
        //   fatherOccupation,
        //   fatherHealth,
        //   motherOccupation,
        //   motherHealth,
        //   parentMarriage,
        //   parentDisease,
        // } = data.data;
        // console.log('dd', data);
        yield put({
          type: 'getOne',
          payload: {
            grownInfo: data.data,
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

export default GrownInfoModel;
