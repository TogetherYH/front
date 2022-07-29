import { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
// import { Column } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { connect, Dispatch, resultByMonthState } from 'umi';
import styles from '../index.less';

interface YearColumnProps {
  resultByMonth: resultByMonthState;
}

const YearColumn: FC<YearColumnProps> = ({ resultByMonth }) => {
  // const data = [
  //   {
  //     date: '2021-8',
  //     scale: 'SCL-90',
  //     times: 203,
  //   },
  //   {
  //     date: '2021-9',
  //     scale: 'SCL-90',
  //     times: 803,
  //   },
  //   {
  //     date: '2021-10',
  //     scale: 'SCL-90',
  //     times: 453,
  //   },
  //   {
  //     date: '2021-11',
  //     scale: 'SCL-90',
  //     times: 343,
  //   },
  //   {
  //     date: '2021-12',
  //     scale: 'SCL-90',
  //     times: 223,
  //   },
  //   {
  //     date: '2022-1',
  //     scale: 'SCL-90',
  //     times: 773,
  //   },
  //   {
  //     date: '2022-2',
  //     scale: 'SCL-90',
  //     times: 73,
  //   },
  //   {
  //     date: '2022-3',
  //     scale: 'SCL-90',
  //     times: 273,
  //   },
  //   {
  //     date: '2022-4',
  //     scale: 'SCL-90',
  //     times: 1073,
  //   },
  //   {
  //     date: '2022-5',
  //     scale: 'SCL-90',
  //     times: 773,
  //   },
  // ];
  const config = {
    data: resultByMonth.data,
    // autoFit: true,
    xField: 'date',
    yField: 'cc',
    seriesField: 'title',
    isGroup: true,
    // height: '150px',
    // width: '200',
    color: ['#20A1EF'],

    // label: {
    //   // 可手动配置 label 数据标签位置
    //   position: 'top',
    //   // 'top', 'bottom', 'middle',
    //   // 配置样式
    //   style: {
    //     fill: '#eeeeee',
    //     opacity: 0.6,
    //   },
    // },
    // xAxis: {
    //   label: {
    //     autoHide: true,
    //     autoRotate: false,
    //   },
    // },
  };

  return (
    <div
      className={styles.card + ' ' + styles.cardHeight}
      style={{ padding: '18px' }}
    >
      <div style={{ height: '100%' }}>
        <Column {...config} />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  resultByMonth,
}: {
  resultByMonth: resultByMonthState;
}) => {
  return {
    resultByMonth,
  };
};

export default connect(mapStateToProps)(YearColumn);
