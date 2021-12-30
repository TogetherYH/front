// import { message } from 'antd';
import { AnswerType } from '@/pages/Base/Answer/data';
import { QuestionType } from '@/pages/Base/Question/data';
import { ScaleType } from '@/pages/Base/Scale/data';
import { Reducer, Effect, Subscription } from 'umi';
import { scaleInfo } from '../service';

export interface testState {
  scale: ScaleType;
  question: QuestionType[];
  answer: AnswerType[];
}

export interface TestModelType {
  namespace: 'test';
  state: testState;
  reducers: {
    getScaleInfo: Reducer<testState>;
  };
  effects: {
    fetechScaleInfo: Effect;
    fetchSave: Effect;
  };
  subscriptions: {
    // setup: Subscription;
  };
}

const TestModel: TestModelType = {
  namespace: 'test',
  state: {
    scale: {},
    question: [],
    answer: [],
  },
  reducers: {
    getScaleInfo(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *fetechScaleInfo({ payload: { scaleId } }, { put, call }) {
      const data = yield call(scaleInfo, { scaleId });
      if (data) {
        yield put({
          type: 'getScaleInfo',
          payload: data.data,
        });
      }
    },
    *fetchSave({ payload: { scaleIds } }, { put, call, select }) {
      // const data = yield call(save, { scaleIds });
      // if (data) {
      //   yield put({
      //     type: 'fetchList',
      //     payload: {},
      //   });
      // }
    },
  },
  subscriptions: {
    //   setup({ dispatch, history }) {
    //     return history.listen((location, action) => {
    //       if (location.pathname === '/publish/common') {
    //         dispatch({
    //           type: 'fetchList',
    //           payload: {},
    //         });
    //       }
    //     });
    //   },
  },
};

export default TestModel;
