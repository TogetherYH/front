// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { progress } from '../service';
import { ZipProgress } from '../data';

export interface zipProgressState {
  total?: number;
  current?: number;
  percent?: string;
  step?: string;
}

export interface ZipProgressModelType {
  namespace: 'zipProgress';
  state: zipProgressState;
  reducers: {
    getProgress: Reducer<zipProgressState>;
    resetProgress: Reducer<zipProgressState>;
  };
  effects: {
    fetchProgress: Effect;
  };
}

const ZipProgressModel: ZipProgressModelType = {
  namespace: 'zipProgress',
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

export default ZipProgressModel;
