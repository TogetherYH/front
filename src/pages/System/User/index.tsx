import React from 'react';
import { Table, Tag, Space } from 'antd';
import { connect, Loading } from 'umi';
import { UserModelState } from '@/models/system/user';

const columns = [
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'username',
  },
  // {
  //   title: 'Age',
  //   dataIndex: 'age',
  //   key: 'age',
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address',
  // },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags: string[]) => (
  //     <>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: UserModelState) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const User = ({ users }: { users: UserModelState[] }) => {
  // console.log('users2', users);
  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

// namespace: 'users'
const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserModelState[];
  loading: Loading;
}) => {
  console.log('users', users);
  // console.log('users1', users);
  return {
    users,
    loading: loading.models.index,
  };
};

export default connect(mapStateToProps)(User);
