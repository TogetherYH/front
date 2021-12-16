import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { getReomteList, addRecord, editRecord, delRecord } from './service';
import { SingleDeptType } from './data';

export interface deptState {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: SingleDeptType[];
}

export interface DeptModelType {
  namespace: 'depts';
  state: deptState;
  reducers: {
    getList: Reducer<deptState>;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    del: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const DeptModel: DeptModelType = {
  namespace: 'depts',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *getRemote({ payload: { pageNum, pageSize, name } }, { put, call }) {
      const data = yield call(getReomteList, { pageNum, pageSize, name });
      if (data) {
        // console.log('ddddddddddddddd', data);
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *edit({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(editRecord, { id, values });
      if (data) {
        message.success('Edit successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.depts;
        });
        yield put({
          type: 'getRemote',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *add({ payload: { values } }, { put, call, select }) {
      const data = yield call(addRecord, { values });
      if (data) {
        message.success('Add successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.depts;
        });
        yield put({
          type: 'getRemote',
          payload: {
            pageNum,
            pageSize,
          },
        });
      }
    },
    *del({ payload: { id } }, { put, call, select }) {
      const data = yield call(delRecord, { id });
      // console.log('dddd', data);
      if (data) {
        message.success('Delete successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.depts;
        });
        // console.log('dddddaaa', pageNum, pageSize);
        yield put({
          type: 'getRemote',
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
