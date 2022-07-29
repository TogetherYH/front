import { FC, useState, useEffect } from 'react';
import { Table } from 'antd';
import '../index.less';

interface RecentWarningProps {}

const RecentWarning: FC<RecentWarningProps> = ({}) => {
  const columns = [
    {
      title: '测评任务',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '测评单位',
      dataIndex: 'scaleName',
      key: 'scaleName',
    },
    {
      title: '测评开始时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '测评人数',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '预警人数',
      dataIndex: 'score',
      key: 'score',
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

export default RecentWarning;
