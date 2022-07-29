import { Reducer, Effect, Subscription } from 'umi';
import { BasicNode, BasicRelationship } from '../G/common';
import { query } from '../service';

export interface queryState {
  nodes: BasicNode[];
  relationships: BasicRelationship[];
}

export interface QueryModelType {
  namespace: 'query';
  state: queryState;
  reducers: {
    getQuery: Reducer<queryState>;
  };
  effects: {
    fetchQuery: Effect;
  };
  // subscriptions: {
  //   setup: Subscription;
  // };
}

const QueryModel: QueryModelType = {
  namespace: 'query',
  state: {
    nodes: [],
    relationships: [],
  },
  reducers: {
    getQuery(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchQuery({ payload: { label, keyword, relationship } }, { put, call }) {
      const data = yield call(query, {
        label,
        keyword,
        relationship,
      });
      if (data) {
        yield put({
          type: 'getQuery',
          payload: {
            ...data.data,
          },
        });
      }
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen((location, action) => {
  //       if (location.pathname === '/system/user') {
  //         dispatch({
  //           type: 'fetchList',
  //           payload: { pageNum: 1, pageSize: 20 },
  //         });
  //       }
  //     });
  //   },
  // },
};

export default QueryModel;
