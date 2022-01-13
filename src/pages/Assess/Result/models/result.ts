import { Reducer, Effect } from 'umi';
import { view } from '../service';

export interface resultState {
  id?: string;
  scaleName?: string;
  userInfo?: {};
  columns?: [];
  socres?: [];
}

export interface ResultModelType {
  namespace: 'result';
  state: resultState;
  reducers: {
    getView: Reducer<resultState>;
    clear: Reducer<resultState>;
  };
  effects: {
    fetchView: Effect;
  };
}

const ResultModel: ResultModelType = {
  namespace: 'result',
  state: {},
  reducers: {
    getView(state, { payload }) {
      const { rows }: { rows: any[] } = payload?.grid;
      let columns: any[] = [];
      let scores: any[] = [];

      if (rows != undefined && rows.length > 0) {
        // 表头
        const { cells }: { cells: any[] } = rows.at(0);
        // console.log('cells', cells);
        cells.map((cell: any) => {
          const t = cell?.paragraphs?.at(0)?.contents?.at(0)?.text;
          columns = [
            ...columns,
            {
              title: t,
              dataIndex: t,
              key: t,
            },
          ];
        });

        // 数据
        for (let i = 1; i < rows.length; i++) {
          let d: any = {};
          const { cells }: { cells: any[] } = rows.at(i);

          for (let j = 0; j < cells.length; j++) {
            d = {
              ...d,
              key: cells.at(0)?.paragraphs?.at(0)?.contents?.at(0)?.text,
              [columns.at(j).dataIndex]: cells
                .at(j)
                ?.paragraphs?.at(0)
                ?.contents?.at(0)?.text,
            };
          }
          scores = [...scores, d];
        }
      }

      return {
        ...payload,
        columns,
        scores,
      };
    },
    clear(state, {}) {
      return {};
    },
  },
  effects: {
    *fetchView({ payload }, { put, call }) {
      const { resultId } = payload;
      const data = yield call(view, { resultId });
      if (data) {
        yield put({
          type: 'getView',
          payload: data.data,
        });
      }
    },
  },
};

export default ResultModel;
