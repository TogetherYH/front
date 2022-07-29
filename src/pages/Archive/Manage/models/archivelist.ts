// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { list } from '../service';
import { ArchiveType } from '../data';

export interface archiveListState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: ArchiveType[];
}

export interface ArchiveListModelType {
  namespace: 'archives';
  state: archiveListState;
  reducers: {
    getList: Reducer<archiveListState>;
  };
  effects: {
    fetchList: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const ArchiveListModel: ArchiveListModelType = {
  namespace: 'archives',
  state: {
    pageNum: 1,
    pageSize: 20,
  },
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchList(
      { payload: { pageNum, pageSize, username, realName } },
      { put, call },
    ) {
      const data = yield call(list, {
        pageNum,
        pageSize,
        username,
        realName,
      });
      if (data) {
        yield put({
          type: 'getList',
          payload: data.data,
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/archive/manage') {
          dispatch({
            type: 'fetchList',
            payload: { pageNum: 1, pageSize: 20 },
          });
        }
      });
    },
  },
};

export default ArchiveListModel;
