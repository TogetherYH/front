import { Reducer, Effect } from 'umi';
import { AnswerType } from '@/pages/Base/Answer/data';
import { QuestionType } from '@/pages/Base/Question/data';
import { ScaleType } from '@/pages/Base/Scale/data';
import { scaleInfo } from '../service';

export interface assessScaleState {
  scale: ScaleType;
  question: QuestionType[];
  answer: AnswerType[];
}

export interface AssessScaleModelType {
  namespace: 'assessScale';
  state: assessScaleState;
  reducers: {
    getScaleInfo: Reducer<assessScaleState>;
  };
  effects: {
    fetchScaleInfo: Effect;
    fetchSave: Effect;
  };
  subscriptions: {
    // setup: Subscription;
  };
}

const AssessScaleModel: AssessScaleModelType = {
  namespace: 'assessScale',
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
    *fetchScaleInfo({ payload: { scaleId } }, { put, call }) {
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

export default AssessScaleModel;
