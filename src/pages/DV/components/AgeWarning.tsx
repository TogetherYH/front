import { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
// import { Column } from '@ant-design/charts';
import { Bar } from '@ant-design/plots';
import styles from '../index.less';

interface AgeWarningProps {}

const AgeWarning: FC<AgeWarningProps> = ({}) => {
  const data = [
    {
      label: '20岁以下',
      type: 'SCL-90',
      value: 2800,
    },
    {
      label: '20岁以下',
      type: 'SAS',
      value: 2260,
    },
    {
      label: '20岁以下',
      type: 'SDS',
      value: 2360,
    },
    {
      label: '20-30岁',
      type: 'SCL-90',
      value: 1800,
    },
    {
      label: '20-30岁',
      type: 'SAS',
      value: 1300,
    },
    {
      label: '20-30岁',
      type: 'SDS',
      value: 1100,
    },
    {
      label: '30-40岁',
      type: 'SCL-90',
      value: 950,
    },
    {
      label: '30-40岁',
      type: 'SAS',
      value: 900,
    },
    {
      label: '30-40岁',
      type: 'SDS',
      value: 1200,
    },
    {
      label: '40-50岁',
      type: 'SCL-90',
      value: 500,
    },
    {
      label: '40-50岁',
      type: 'SAS',
      value: 390,
    },
    {
      label: '40-50岁',
      type: 'SDS',
      value: 590,
    },
    {
      label: '50岁以上',
      type: 'SCL-90',
      value: 170,
    },
    {
      label: '50岁以上',
      type: 'SAS',
      value: 100,
    },
    {
      label: '50岁以上',
      type: 'SDS',
      value: 90,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'value',
    yField: 'label',

    color: ['#20A1EF', '#F88C24', '#62DAAB'],

    /** 自定义颜色 */
    // color: ['#1383ab', '#c52125'],
    seriesField: 'type',
    marginRatio: 0,
    label: null,
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

export default AgeWarning;
