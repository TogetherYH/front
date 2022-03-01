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
    fetchTree: Effect;
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
      const root: MenuTreeType[] = [
        {
          id: 'root',
          name: '根菜单',
          path: '',
          parentId: '',
          children: action.payload,
        },
      ];
      return {
        tree: root,
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
          location.pathname === '/system/menu' ||
          location.pathname === '/system/role'
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

export default MenuTreeModel;
