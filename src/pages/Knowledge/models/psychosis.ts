// import { message } from 'antd';
import { Reducer, Effect, Subscription } from 'umi';
import { BasicNode } from '../G/common';
import { list } from '../service/psychosis';
// import { AnswerType } from '../data';

export interface psychosisState {
  nodes: BasicNode[];
}

export interface PsychosisModelType {
  namespace: 'psychosis';
  state: psychosisState;
  reducers: {
    getList: Reducer<psychosisState>;
  };
  effects: {
    fetchList: Effect;
  };
  // subscriptions: {
  //   setup: Subscription;
  // };
}

const PsychosisModel: PsychosisModelType = {
  namespace: 'psychosis',
  state: {
    nodes: [],
  },
  reducers: {
    getList(state, action) {
      let nodes: BasicNode[] = [];
      action.payload.nodes.map((c: any) => {
        nodes.push({
          id: c.uuid,
          labels: ['Psychosis'],
          properties: {
            name: c.name,
          },
          propertyTypes: {},
        });
      });

      return { nodes };
    },
  },
  effects: {
    *fetchList({ payload: { name } }, { put, call }) {
      const data = yield call(list, {
        name,
      });
      if (data) {
        yield put({
          type: 'getList',
          payload: {
            nodes: data.data,
          },
        });
      }
    },
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

export default PsychosisModel;
