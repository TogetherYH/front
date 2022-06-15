import { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
// import { Column } from '@ant-design/charts';
import { Bar } from '@ant-design/plots';
import styles from '../index.less';

interface DeptWarningProps {}

const DeptWarning: FC<DeptWarningProps> = ({}) => {
  const data = [
    {
      type: 'xxx医院',
      sales: 188,
    },
    {
      type: 'xxx部队',
      sales: 162,
    },
    {
      type: 'xxx医院',
      sales: 161,
    },
    {
      type: 'xxx供储基地',
      sales: 145,
    },
    {
      type: 'xxx疗养院',
      sales: 148,
    },
    {
      type: 'xxx旅',
      sales: 138,
    },
    {
      type: 'xxx部队',
      sales: 108,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  const config = {
    animation: false,
    data,
    xField: 'sales',
    yField: 'type',

    color: ({ type }: { type: any }) => {
      return '#F88C24';
    },
    minBarWidth: 10,
    maxBarWidth: 10,
  };

  return (
    <div
      className={styles.card + ' ' + styles.cardHeight}
      style={{ padding: '18px' }}
    >
      <div style={{ height: '100%' }}>
        <Bar {...config} />
      </div>
    </div>
  );
};

export default DeptWarning;
