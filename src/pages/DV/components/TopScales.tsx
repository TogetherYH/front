import { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/charts';
import styles from '../index.less';

interface TopScalesProps {}

const TopScales: FC<TopScalesProps> = ({}) => {
  const data = [
    {
      type: 'SCL-90',
      sales: 1038,
    },
    {
      type: 'SAS',
      sales: 1000,
    },
    {
      type: 'SDS',
      sales: 801,
    },
    {
      type: 'MMPI',
      sales: 200,
    },
  ];
  const config = {
    data,
    autoFit: true,
    xField: 'type',
    yField: 'sales',
    color: '#20A1EF',
    columnWidthRatio: 0.4,
    // height: 250,
    // width: 300,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#eeeeee',
        opacity: 0.8,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <div className={styles.card + ' ' + styles.cardHeight}>
      <Column {...config} />
    </div>
  );
};

export default TopScales;
