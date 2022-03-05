import { Reducer, Effect, Subscription } from 'umi';
import { items, addItem, updateItem } from '../service';
import { DictItemType } from '../data';

export interface dictItemListState {
  list: DictItemType[];
}

export interface DictItemListModelType {
  namespace: 'dictitems';
  state: dictItemListState;
  reducers: {
    getList: Reducer<dictItemListState>;
    addBlank: Reducer<dictItemListState>;
    removeBlank: Reducer<dictItemListState>;
  };
  effects: {
    fetchList: Effect;
    fetchUpdate: Effect;
    fetchAdd: Effect;
  };
}

const DictItemListModel: DictItemListModelType = {
  namespace: 'dictitems',
  state: { list: [] },
  reducers: {
    getList(state, action) {
      return action.payload;
    },
    addBlank(state, action) {
      const n: DictItemType = {
        id: 'new',
        code: '',
        label: '',
        value: '',
        order: 1,
      };
      if (state && state.list) {
        return { list: [...state.list, n] };
      } else {
        return { list: [n] };
      }
    },
    removeBlank(state, action) {
      if (state?.list?.length && state?.list?.length > 1) {
        const a = state?.list?.slice(0, state?.list?.length - 1);
        return { list: a };
      } else {
        return { list: [] };
      }
    },
  },
  effects: {
    *fetchAdd({ payload: { values } }, { put, call, select }) {
      const data = yield call(addItem, { values });
      if (data) {
        // message.success('Add successfully');
        const { code } = yield select((state: any) => {
          return state.dicts;
        });
        yield put({
          type: 'fetchList',
          payload: {
            dictCode: values.code,
          },
        });
      }
    },
    *fetchList({ payload: { dictCode } }, { put, call }) {
      const data = yield call(items, {
        dictCode,
      });
      if (data) {
        yield put({
          type: 'getList',
          payload: { list: data.data },
        });
      }
    },
    *fetchUpdate({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(updateItem, { id, values });
      if (data) {
        // message.success('Edit successfully');
        const { pageNum, pageSize } = yield select((state: any) => {
          return state.dicts;
        });
        yield put({
          type: 'fetchList',
          payload: {
            dictCode: values.code,
          },
        });
      }
    },
  },
};

export default DictItemListModel;
