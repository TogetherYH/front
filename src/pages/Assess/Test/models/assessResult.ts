import { Reducer, Effect } from 'umi';
import { addResult, submitResult } from '../service';

export interface assessResultState {
  resultId: string;
  userId: string;
  scaleId: string;
  publishId: string;
}

export interface AssessResultModelType {
  namespace: 'assessResult';
  state: assessResultState;
  reducers: {
    getResultInfo: Reducer<assessResultState>;
  };
  effects: {
    fetchAdd: Effect;
    fetchSubmit: Effect;
  };
  subscriptions: {
    // setup: Subscription;
  };
}

const AssessResultModel: AssessResultModelType = {
  namespace: 'assessResult',
  state: {
    resultId: '',
    userId: '',
    scaleId: '',
    publishId: '',
  },
  reducers: {
    getResultInfo(state, action) {
      console.log('ppp', action.payload);
      return {
        resultId: action.payload,
        userId: '',
        scaleId: '',
        publishId: '',
      };
    },
  },
  effects: {
    *fetchAdd({ payload: { userId, scaleId, publishId } }, { put, call }) {
      // console.log(action, effects);
      const data = yield call(addResult, { userId, scaleId, publishId });
      if (data) {
        yield put({
          type: 'getResultInfo',
          payload: data.data,
        });
      }
    },
    *fetchSubmit(
      { payload: { id, userId, scaleId, publishId, result } },
      { put, call },
    ) {
      // console.log(payload, put, select, call);
      const data = yield call(submitResult, {
        id,
        userId,
        scaleId,
        publishId,
        result,
      });
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

export default AssessResultModel;
