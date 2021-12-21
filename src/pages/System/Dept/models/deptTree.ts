// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { tree } from '../service';
import { DeptTreeType } from '../data';

export interface deptTreeState {
  tree?: DeptTreeType[];
}

export interface DeptModelType {
  namespace: 'deptTree';
  state: deptTreeState;
  reducers: {
    getTree: Reducer<deptTreeState>;
  };
  effects: {
    getRemote: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const DeptModel: DeptModelType = {
  namespace: 'deptTree',
  state: {},
  reducers: {
    getTree(state, action) {
      return {
        tree: action.payload,
      };
    },
  },
  effects: {
    *getRemote({ payload }, { put, call }) {
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
        if (location.pathname === '/system/dept') {
          dispatch({
            type: 'getRemote',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default DeptModel;
