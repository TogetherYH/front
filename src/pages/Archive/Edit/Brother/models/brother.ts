// import { message } from 'antd';
import { Reducer, Effect } from 'umi';
import { get, update, add } from '../service';
import { BrotherSisterType } from '../data';

export interface brotherSisterState {
  brotherSister?: BrotherSisterType;
}

export interface BrotherSisterModelType {
  namespace: 'brotherSister';
  state: brotherSisterState;
  reducers: {
    getOne: Reducer<brotherSisterState>;
  };
  effects: {
    fetchOne: Effect;
    fetchUpdate: Effect;
    fetchAdd: Effect;
  };
}

const BrotherSisterModel: BrotherSisterModelType = {
  namespace: 'brotherSister',
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
            brotherSister: data.data,
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

export default BrotherSisterModel;
