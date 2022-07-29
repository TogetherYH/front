import { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
// import { Column } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import styles from '../index.less';

interface PhyWarningProps {}

const PhyWarning: FC<PhyWarningProps> = ({}) => {
  const data = [
    {
      name: '心电预警',
      month: 'Jan.',
      warningCout: 189,
    },
    {
      name: '心电预警',
      month: 'Feb.',
      warningCout: 288,
    },
    {
      name: '心电预警',
      month: 'Mar.',
      warningCout: 393,
    },
    {
      name: '心电预警',
      month: 'Apr.',
      warningCout: 814,
    },
    {
      name: '心电预警',
      month: 'May',
      warningCout: 470,
    },
    {
      name: '心电预警',
      month: 'Jun.',
      warningCout: 203,
    },
    {
      name: '心电预警',
      month: 'Jul.',
      warningCout: 240,
    },
    {
      name: '心电预警',
      month: 'Aug.',
      warningCout: 356,
    },
    {
      name: '脑电预警',
      month: 'Jan.',
      warningCout: 124,
    },
    {
      name: '脑电预警',
      month: 'Feb.',
      warningCout: 232,
    },
    {
      name: '脑电预警',
      month: 'Mar.',
      warningCout: 345,
    },
    {
      name: '脑电预警',
      month: 'Apr.',
      warningCout: 997,
    },
    {
      name: '脑电预警',
      month: 'May',
      warningCout: 526,
    },
    {
      name: '脑电预警',
      month: 'Jun.',
      warningCout: 355,
    },
    {
      name: '脑电预警',
      month: 'Jul.',
      warningCout: 374,
    },
    {
      name: '脑电预警',
      month: 'Aug.',
      warningCout: 424,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'warningCout',
    seriesField: 'name',

    /** 设置颜色 */
    color: ['#20A1EF', '#F88C24', '#62DAAB'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: null,
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

export default PhyWarning;
