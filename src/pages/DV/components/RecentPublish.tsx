import { FC, useState, useEffect } from 'react';
import { Table } from 'antd';
import '../index.less';

interface RecentPublishProps {}

const RecentPublish: FC<RecentPublishProps> = ({}) => {
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
  ];

  return (
    <div>
      <Table
        className="card cardHeight"
        size="small"
        columns={columns}
        dataSource={data}
        // showHeader={false}
        pagination={false}
        style={{ padding: '18px' }}
      />
    </div>
  );
};

export default RecentPublish;
