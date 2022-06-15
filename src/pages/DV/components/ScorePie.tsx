import { FC, useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
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
    legend: false,
    // autoFit: true,
    data: data1,
    angleField: 'value',
    colorField: 'type',
    // height: 250,
    radius: 0.75,
    innerRadius: 0.65,
    color: ['#00D98B', 'yellow', 'orange', 'red'],
    label: null,
    statistic: {
      title: null,
      content: {
        style: {
          fontSize: '14px',
          color: 'gray',
        },
        customHtml: '90项症状清单',
      },
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
    legend: false,
    // autoFit: true,
    data: data2,
    angleField: 'value',
    colorField: 'type',

    // height: 250,
    radius: 0.75,
    innerRadius: 0.65,
    color: ['#00D98B', 'yellow', 'orange', 'red'],
    label: null,
    statistic: {
      title: null,
      content: {
        style: {
          fontSize: '14px',
          color: 'gray',
        },
        customHtml: '焦虑自评量表',
      },
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
    legend: false,
    // autoFit: true,
    data: data3,
    angleField: 'value',
    colorField: 'type',
    // height: 250,
    radius: 0.75,
    innerRadius: 0.65,
    color: ['#00D98B', 'yellow', 'orange', 'red'],
    label: null,
    statistic: {
      title: null,
      content: {
        style: {
          fontSize: '14px',
          color: 'gray',
        },
        customHtml: '抑郁自评量表',
      },
    },
  };

  return (
    <div
      className={styles.card + ' ' + styles.cardHeight}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // lineHeight: 4,
      }}
    >
      <Row style={{ width: '100%' }}>
        <Col span={8} style={{ height: '100%' }}>
          <Pie {...config1} />
        </Col>
        <Col span={8} style={{ height: '100%' }}>
          <Pie {...config2} />
        </Col>
        <Col span={8} style={{ height: '100%' }}>
          <Pie {...config3} />
        </Col>
      </Row>
    </div>
  );
};

export default ScorePie;
