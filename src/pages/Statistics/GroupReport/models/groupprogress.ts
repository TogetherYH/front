// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { progress } from '../service';

export interface GroupProgress {
  current: number;
  total: number;
  step: string;
}

export interface groupProgressState {
  total?: number;
  current?: number;
  percent?: string;
  step?: string;
}

export interface GroupProgressModelType {
  namespace: 'groupProgress';
  state: groupProgressState;
  reducers: {
    getProgress: Reducer<groupProgressState>;
    resetProgress: Reducer<groupProgressState>;
  };
  effects: {
    fetchProgress: Effect;
  };
}

const GroupProgressModel: GroupProgressModelType = {
  namespace: 'groupProgress',
  state: {
    total: 100,
    current: 0,
    percent: '0/100',
    step: '',
  },
  reducers: {
    getProgress(state, { payload }) {
      return {
        ...payload,
      };
    },
    resetProgress(state, {}) {
      return {
        total: 100,
        current: 0,
        percent: '0/100',
        step: '',
      };
    },
  },
  effects: {
    *fetchProgress({ payload: {} }, { put, call }) {
      const data = yield call(progress, {});
      if (data) {
        yield put({
          type: 'getProgress',
          payload: data.data,
        });
      }
    },
  },
};

export default GroupProgressModel;
