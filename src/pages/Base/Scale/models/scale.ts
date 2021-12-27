// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { get, update, del, add } from '../service';
import { ScaleType } from '../data';

export interface scaleState {
  id?: string;
  name?: string;
  code?: string;
  parentId?: string;
  createTime?: string;
  status?: string;
}

export interface ScaleModelType {
  namespace: 'scale';
  state: scaleState;
  reducers: {
    getOne: Reducer<scaleState>;
  };
  effects: {
    fetchOne: Effect;
    // fetchDelete: Effect;
    // fetchUpdate: Effect;
    // fetchAdd: Effect;
  };
  // subscriptions: {
  //   setup: Subscription;
  // };
}

const ScaleModel: ScaleModelType = {
  namespace: 'scale',
  state: {},
  reducers: {
    getOne(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchOne({ payload: { scaleId } }, { put, call }) {
      const data = yield call(get, {
        scaleId,
      });
      if (data) {
        yield put({
          type: 'getOne',
          payload: data.data,
        });
      }
    },
    // *fetchUpdate({ payload: { id, values } }, { put, call, select }) {
    //   const data = yield call(update, { id, values });
    //   if (data) {
    //     // message.success('Edit successfully');
    //     const { pageNum, pageSize } = yield select((state: any) => {
    //       return state.users;
    //     });
    //     yield put({
    //       type: 'fetchList',
    //       payload: {
    //         pageNum,
    //         pageSize,
    //       },
    //     });
    //   }
    // },
    // *fetchAdd({ payload: { values } }, { put, call, select }) {
    //   const data = yield call(add, { values });
    //   if (data) {
    //     // message.success('Add successfully');
    //     const { pageNum, pageSize } = yield select((state: any) => {
    //       return state.users;
    //     });
    //     yield put({
    //       type: 'fetchList',
    //       payload: {
    //         pageNum,
    //         pageSize,
    //       },
    //     });
    //   }
    // },
    // *fetchDelete({ payload: { id } }, { put, call, select }) {
    //   const data = yield call(del, { id });
    //   if (data) {
    //     // message.success('Delete successfully');
    //     const { pageNum, pageSize } = yield select((state: any) => {
    //       return state.users;
    //     });
    //     yield put({
    //       type: 'fetchList',
    //       payload: {
    //         pageNum,
    //         pageSize,
    //       },
    //     });
    //   }
    // },
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

export default ScaleModel;
