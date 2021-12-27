// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { tree } from '../service';
import { ScaleTreeType } from '../data';

export interface scaleTreeState {
  tree?: ScaleTreeType[];
}

export interface ScaleModelType {
  namespace: 'scaleTree';
  state: scaleTreeState;
  reducers: {
    getTree: Reducer<scaleTreeState>;
  };
  effects: {
    fetchTree: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const ScaleTreeModel: ScaleModelType = {
  namespace: 'scaleTree',
  state: {},
  reducers: {
    getTree(state, action) {
      return {
        tree: action.payload,
      };
    },
  },
  effects: {
    *fetchTree({ payload }, { put, call }) {
      const data = yield call(tree);
      if (data) {
        yield put({
          type: 'getTree',
          payload: data.data,
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (
          location.pathname === '/base/scale' ||
          location.pathname === '/base/answer' ||
          location.pathname === '/base/factor' ||
          location.pathname === '/base/question'
        ) {
          dispatch({
            type: 'fetchTree',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default ScaleTreeModel;
