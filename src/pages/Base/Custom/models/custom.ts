// import { message } from 'antd';
import { Effect } from 'umi';
import { imp } from '../service';

export interface customState {}

export interface CustomModelType {
  namespace: 'custom';
  state: customState;
  effects: {
    fetchImport: Effect;
  };
}

const CustomModel: CustomModelType = {
  namespace: 'custom',
  state: {
    pageNum: 1,
    pageSize: 20,
  },
  effects: {
    *fetchImport({ payload: { values } }, { put, call, select }) {
      const data = yield call(imp, { values });
    },
  },
};

export default CustomModel;
