// import { message } from 'antd';
import { Reducer, Effect } from 'umi';
import { get } from '../service';

export interface publishState {
  id?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
  createTime?: string;
  status?: string;
  scales?: any[];
  depts?: any[];
}

export interface PublishModelType {
  namespace: 'publish';
  state: publishState;
  reducers: {
    getOne: Reducer<publishState>;
  };
  effects: {
    fetchOne: Effect;
  };
}

const PublishModel: PublishModelType = {
  namespace: 'publish',
  state: {},
  reducers: {
    getOne(state, action) {
      return action.payload;
    },
  },
  effects: {
    *fetchOne({ payload: { publishId } }, { put, call }) {
      const data = yield call(get, {
        publishId,
      });
      if (data) {
        yield put({
          type: 'getOne',
          payload: data.data,
        });
      }
    },
  },
};

export default PublishModel;
