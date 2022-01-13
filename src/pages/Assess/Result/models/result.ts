import { Reducer, Effect } from 'umi';
import { view } from '../service';

export interface resultState {
  id?: string;
  scaleName?: string;
  userInfo?: {};
  columns?: [];
  socres?: [];
  charts?: {};
  chartsType?: string;
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
  state: {
    // charts: {
    //   // autoFit: false,
    //   // height: 150,
    //   data: [{
    //     title: '',
    //     ranges: [40, 70, 100],
    //     measures: [80],
    //     target: 85,
    //   }],
    //   measureField: 'measures',
    //   rangeField: 'ranges',
    //   // targetField: 'target',
    //   // xField: 'title',
    //   // color: {
    //   //   range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
    //   //   measure: '#5B8FF9',
    //   //   target: '#39a3f4',
    //   // },
    //   // xAxis: {
    //   //   line: null,
    //   // },
    //   // yAxis: false,
    //   // label: {
    //   //   target: true,
    //   // },
    //   // // 自定义 legend
    //   // legend: {
    //   //   custom: true,
    //   //   position: 'bottom',
    //   //   items: [
    //   //     {
    //   //       value: '差',
    //   //       name: '差',
    //   //       marker: {
    //   //         symbol: 'square',
    //   //         style: {
    //   //           fill: '#FFbcb8',
    //   //           r: 5,
    //   //         },
    //   //       },
    //   //     },
    //   //     {
    //   //       value: '良',
    //   //       name: '良',
    //   //       marker: {
    //   //         symbol: 'square',
    //   //         style: {
    //   //           fill: '#FFe0b0',
    //   //           r: 5,
    //   //         },
    //   //       },
    //   //     },
    //   //     {
    //   //       value: '优',
    //   //       name: '优',
    //   //       marker: {
    //   //         symbol: 'square',
    //   //         style: {
    //   //           fill: '#bfeec8',
    //   //           r: 5,
    //   //         },
    //   //       },
    //   //     },
    //   //     {
    //   //       value: '实际值',
    //   //       name: '实际值',
    //   //       marker: {
    //   //         symbol: 'square',
    //   //         style: {
    //   //           fill: '#5B8FF9',
    //   //           r: 5,
    //   //         },
    //   //       },
    //   //     },
    //   //     {
    //   //       value: '目标值',
    //   //       name: '目标值',
    //   //       marker: {
    //   //         symbol: 'line',
    //   //         style: {
    //   //           stroke: '#39a3f4',
    //   //           r: 5,
    //   //         },
    //   //       },
    //   //     },
    //   //   ],
    //   // },
    // }
  },
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
      return { charts: {} };
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
