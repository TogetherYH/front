import { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/charts';
import styles from '../index.less';

interface YearColumnProps {}

const YearColumn: FC<YearColumnProps> = ({}) => {
  const data = [
    {
      date: '2021-8',
      scale: 'SCL-90',
      times: 203,
    },
    {
      date: '2021-8',
      scale: 'SAS',
      times: 456,
    },
    {
      date: '2021-8',
      scale: 'SDS',
      times: 777,
    },
    {
      date: '2021-9',
      scale: 'SCL-90',
      times: 803,
    },
    {
      date: '2021-9',
      scale: 'SAS',
      times: 1203,
    },
    {
      date: '2021-9',
      scale: 'SDS',
      times: 603,
    },
    {
      date: '2021-10',
      scale: 'SCL-90',
      times: 453,
    },
    {
      date: '2021-10',
      scale: 'SAS',
      times: 1003,
    },
    {
      date: '2021-10',
      scale: 'SDS',
      times: 603,
    },
    {
      date: '2021-11',
      scale: 'SCL-90',
      times: 343,
    },
    {
      date: '2021-11',
      scale: 'SAS',
      times: 203,
    },
    {
      date: '2021-11',
      scale: 'SDS',
      times: 603,
    },
    {
      date: '2021-12',
      scale: 'SCL-90',
      times: 223,
    },
    {
      date: '2021-12',
      scale: 'SAS',
      times: 203,
    },
    {
      date: '2021-12',
      scale: 'SDS',
      times: 603,
    },
    {
      date: '2022-1',
      scale: 'SCL-90',
      times: 773,
    },
    {
      date: '2022-1',
      scale: 'SAS',
      times: 503,
    },
    {
      date: '2022-1',
      scale: 'SDS',
      times: 603,
    },
  ];
  const config = {
    data,
    // autoFit: true,
    xField: 'date',
    yField: 'times',
    seriesField: 'scale',
    isGroup: true,
    // height: 250,
    // width: 500,
    color: ['#20A1EF', '#FFBE3D', '#F56845', '#62DEEA'],

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
    <div className={styles.card + ' ' + styles.cardHeight}>
      <Column {...config} />
    </div>
  );
};

export default YearColumn;
