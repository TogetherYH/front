import { Reducer, Effect, Subscription } from 'umi';
import { search } from '../service';

export interface originalState {
  columns?: any[];
  list?: any[];
}

export interface OriginalModelType {
  namespace: 'original';
  state: originalState;
  reducers: {
    getList: Reducer<originalState>;
    clear: Reducer<originalState>;
  };
  effects: {
    fetchSearch: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const OriginalModel: OriginalModelType = {
  namespace: 'original',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
    clear(stata, action) {
      return {};
    },
  },
  effects: {
    *fetchSearch({ payload }, { put, call, select }) {
      console.log('dd', payload);
      const data = yield call(search, payload);
      if (data) {
        var { columns, list } = data.data;

        const questionNum = list?.at(0)?.questionNum;
        if (questionNum > 0) {
          for (var i = 0; i < questionNum; i++) {
            columns.push({
              title: '题目' + (i + 1),
              dataIndex: 'question' + (i + 1),
              key: 'question' + (i + 1),
              width: 70,
            });
          }

          for (let r of list) {
            let qj: any[] = JSON.parse(r.questionJson);

            for (var j = 0; j < questionNum; j++) {
              r['question' + (j + 1)] = qj[j].answerOption;
            }
          }
        }

        yield put({
          type: 'getList',
          payload: {
            columns,
            list,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/statistics/originalExp') {
          dispatch({
            type: 'clear',
            payload: {},
          });
        }
      });
    },
  },
};

export default OriginalModel;
