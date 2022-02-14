import { FC, useState, useEffect } from 'react';
import { Table } from 'antd';
import styles from '../index.less';

interface RecentProps {}

const Recent: FC<RecentProps> = ({}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'scaleName',
      key: 'scaleName',
    },
    {
      title: 'Address',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Address',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  const data = [
    {
      key: '1',
      name: '张三',
      scaleName: '90项症状清单',
      score: 90,
      time: '2022-01-12 12:34:47',
    },
    {
      key: '2',
      name: '张三',
      scaleName: '焦虑自评量表',
      score: 90,
      time: '2022-01-12 12:34:47',
    },
    {
      key: '3',
      name: '张三',
      scaleName: '90项症状清单',
      score: 90,
      time: '2022-01-12 12:34:47',
    },
    {
      key: '4',
      name: '张三',
      scaleName: '焦虑自评量表',
      score: 90,
      time: '2022-01-12 12:34:47',
    },
    {
      key: '5',
      name: '张三',
      scaleName: '焦虑自评量表',
      score: 90,
      time: '2022-01-12 12:34:47',
    },
    // {
    //   key: '6',
    //   name: '张三',
    //   scaleName: '90项症状清单',
    //   score: 90,
    //   time: '2022-01-12 12:34:47'
    // },
  ];

  return (
    <div
      className={styles.card + ' ' + styles.cardHeight}
      style={{ width: '400' }}
    >
      <Table
        rowClassName={styles.tableBgc}
        columns={columns}
        dataSource={data}
        showHeader={false}
        pagination={false}
      />
    </div>
  );
};

export default Recent;
