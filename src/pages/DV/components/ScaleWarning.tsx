import { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
// import { Column } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { connect, Dispatch, warningByMonthState } from 'umi';
import styles from '../index.less';

interface ScaleWarningProps {
  warningByMonth: warningByMonthState;
}

const ScaleWarning: FC<ScaleWarningProps> = ({ warningByMonth }) => {
  // const data = [
  //   {
  //     name: 'SCL-90',
  //     month: 'Jan.',
  //     warningCout: 189,
  //   },
  //   {
  //     name: 'SCL-90',
  //     month: 'Feb.',
  //     warningCout: 288,
  //   },
  //   {
  //     name: 'SCL-90',
  //     month: 'Mar.',
  //     warningCout: 393,
  //   },
  //   {
  //     name: 'SCL-90',
  //     month: 'Apr.',
  //     warningCout: 814,
  //   },
  //   {
  //     name: 'SCL-90',
  //     month: 'May',
  //     warningCout: 470,
  //   },
  //   {
  //     name: 'SCL-90',
  //     month: 'Jun.',
  //     warningCout: 203,
  //   },
  //   {
  //     name: 'SCL-90',
  //     month: 'Jul.',
  //     warningCout: 240,
  //   },
  //   {
  //     name: 'SCL-90',
  //     month: 'Aug.',
  //     warningCout: 356,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'Jan.',
  //     warningCout: 124,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'Feb.',
  //     warningCout: 232,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'Mar.',
  //     warningCout: 345,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'Apr.',
  //     warningCout: 997,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'May',
  //     warningCout: 526,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'Jun.',
  //     warningCout: 355,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'Jul.',
  //     warningCout: 374,
  //   },
  //   {
  //     name: 'SAS',
  //     month: 'Aug.',
  //     warningCout: 424,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'Jan.',
  //     warningCout: 389,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'Feb.',
  //     warningCout: 188,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'Mar.',
  //     warningCout: 593,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'Apr.',
  //     warningCout: 514,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'May',
  //     warningCout: 670,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'Jun.',
  //     warningCout: 303,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'Jul.',
  //     warningCout: 349,
  //   },
  //   {
  //     name: 'SDS',
  //     month: 'Aug.',
  //     warningCout: 256,
  //   },
  // ];
  const config = {
    data: warningByMonth.data,
    isGroup: true,
    xField: 'date',
    yField: 'cc',
    seriesField: 'scale_name',

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

const mapStateToProps = ({
  warningByMonth,
}: {
  warningByMonth: warningByMonthState;
}) => {
  return {
    warningByMonth,
  };
};

export default connect(mapStateToProps)(ScaleWarning);
