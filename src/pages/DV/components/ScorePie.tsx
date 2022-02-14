import { FC, useState, useEffect } from 'react';
import { Card, Row } from 'antd';
import { Pie } from '@ant-design/charts';
import styles from '../index.less';

interface ScorePieProps {}

const ScorePie: FC<ScorePieProps> = ({}) => {
  const data1 = [
    {
      type: '正常',
      value: 80,
    },
    {
      type: '轻度焦虑',
      value: 10,
    },
    {
      type: '中度焦虑',
      value: 7,
    },
    {
      type: '重度度焦虑',
      value: 3,
    },
  ];
  const config1 = {
    // appendPadding: 10,
    autoFit: true,
    data: data1,
    angleField: 'value',
    colorField: 'type',
    // height: 250,
    radius: 0.75,
    innerRadius: 0.65,
    color: ['#00D98B', 'yellow', 'orange', 'red'],
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{percentage}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: '90项症状',
      },
      content: false,
    },
  };

  const data2 = [
    {
      type: '正常',
      value: 90,
    },
    {
      type: '轻度焦虑',
      value: 6,
    },
    {
      type: '中度焦虑',
      value: 3,
    },
    {
      type: '重度度焦虑',
      value: 1,
    },
  ];
  const config2 = {
    // appendPadding: 10,
    autoFit: true,
    data: data2,
    angleField: 'value',
    colorField: 'type',
    // height: 250,
    radius: 0.75,
    innerRadius: 0.65,
    color: ['#00D98B', 'yellow', 'orange', 'red'],
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{percentage}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: '焦虑自评',
      },
      content: false,
    },
  };

  const data3 = [
    {
      type: '正常',
      value: 90,
    },
    {
      type: '轻度焦虑',
      value: 5,
    },
    {
      type: '中度焦虑',
      value: 3,
    },
    {
      type: '重度度焦虑',
      value: 2,
    },
  ];
  const config3 = {
    // appendPadding: 10,
    autoFit: true,
    data: data3,
    angleField: 'value',
    colorField: 'type',
    // height: 250,
    radius: 0.75,
    innerRadius: 0.65,
    color: ['#00D98B', 'yellow', 'orange', 'red'],
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{percentage}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: '抑郁自评',
      },
      content: false,
    },
  };

  return (
    <div className={styles.card + ' ' + styles.cardHeight}>
      <Row className={styles.row + ' ' + styles.cardHeight}>
        <Pie {...config1} />
        <Pie {...config2} />
        <Pie {...config3} />
      </Row>
    </div>
  );
};

export default ScorePie;
