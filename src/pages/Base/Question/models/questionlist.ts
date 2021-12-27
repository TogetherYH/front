// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list, update, del, add } from '../service';
import { QuestionType } from '../data';

export interface questionListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: QuestionType[];
}

export interface QuestionListModelType {
  namespace: 'questions';
  state: questionListState;
  reducers: {
    getList: Reducer<questionListState>;
  };
  effects: {
    fetchList: Effect;
    fetchUpdate: Effect;
    fetchDelete: Effect;
    fetchAdd: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const QuestionListModel: QuestionListModelType = {
  namespace: 'questions',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList(
      { payload: { pageNum, pageSize, name, scaleId } },
      { put, call },
    ) {
      const data = yield call(list, {
        pageNum,
        pageSize,
        name,
        scaleId,
      });
      if (data) {
        yield put({
          type: 'getList',
          payload: data.data,
        });
      }
    },
    *fetchUpdate({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(update, { id, values });
      if (data) {
        // message.success('Edit successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.questions;
        });
        yield put({
          type: 'fetchList',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(add, { values });
      if (data) {
        // message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.questions;
        });
        yield put({
          type: 'fetchList',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *fetchDelete({ payload: { id } }, { put, call, select }) {
      const data = yield call(del, { id });
      if (data) {
        // message.success('Delete successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.questions;
        });
        yield put({
          type: 'fetchList',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/base/question') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default QuestionListModel;
