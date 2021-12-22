// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { tree } from '../service';
import { MenuTreeType } from '../data';

export interface menuTreeState {
  tree?: MenuTreeType[];
}

export interface MenuModelType {
  namespace: 'menuTree';
  state: menuTreeState;
  reducers: {
    getTree: Reducer<menuTreeState>;
  };
  effects: {
    getRemote: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const MenuTreeModel: MenuModelType = {
  namespace: 'menuTree',
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
        if (location.pathname === '/system/menu') {
          dispatch({
            type: 'getRemote',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default MenuTreeModel;
