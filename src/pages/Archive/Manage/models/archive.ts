import { Reducer, Effect } from 'umi';
import { view } from '../service';

export interface archiveState {
  id?: string;
  userInfo?: any;
  grownInfo?: any;
  raisingHistory?: [];
  parentInfo?: any;
  childInfo?: [];
  militaryLife?: any;
}

export interface ArchiveModelType {
  namespace: 'archive';
  state: archiveState;
  reducers: {
    getView: Reducer<archiveState>;
    clear: Reducer<archiveState>;
  };
  effects: {
    fetchView: Effect;
  };
}

const ArchiveModel: ArchiveModelType = {
  namespace: 'archive',
  state: {},
  reducers: {
    getView(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return {};
    },
  },
  effects: {
    *fetchView({ payload }, { put, call }) {
      const { archiveId } = payload;
      const data = yield call(view, { archiveId });
      if (data) {
        yield put({
          type: 'getView',
          payload: data.data,
        });
      }
    },
  },
};

export default ArchiveModel;
